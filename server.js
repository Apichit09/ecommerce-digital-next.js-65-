const express = require('express')
const { generatePayload } = require('promptpay-qr')
const QRCode = require('qrcode')
const axios = require('axios')
const crypto = require('crypto')

const app = express()
app.use(express.json())

// ตั้งค่าสำหรับ PromptPay
const PROMPTPAY_NUMBER = process.env.PROMPTPAY_NUMBER

// ตั้งค่าสำหรับ TrueWallet
const TRUEWALLET_PUBLIC_KEY = process.env.TRUEWALLET_PUBLIC_KEY
const TRUEWALLET_PRIVATE_KEY = process.env.TRUEWALLET_PRIVATE_KEY
const TRUEWALLET_MERCHANT_ID = process.env.TRUEWALLET_MERCHANT_ID

// API สร้าง QR PromptPay
app.post('/api/payment/promptpay', async (req, res) => {
    try {
        const { amount } = req.body

        // สร้าง payload สำหรับ PromptPay QR
        const payload = generatePayload(PROMPTPAY_NUMBER, { amount })
        
        // สร้าง QR Code เป็น Data URL
        const qrCode = await QRCode.toDataURL(payload)

        // สร้างข้อมูลธุรกรรม
        const transaction = {
            id: generateTransactionId(),
            amount: amount,
            qrCode: qrCode,
            type: 'PROMPTPAY',
            status: 'PENDING',
            createdAt: new Date()
        }

        // บันทึกลง database (ตัวอย่างเก็บในตัวแปร)
        saveTransaction(transaction)

        res.json({
            success: true,
            data: {
                reference: transaction.id,
                amount: amount,
                qrCode: qrCode
            }
        })

    } catch (error) {
        console.error('Error generating PromptPay QR:', error)
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการสร้าง QR Code'
        })
    }
})

// API สร้างอั่งเปา TrueWallet
app.post('/api/payment/truewallet-gift', async (req, res) => {
    try {
        const { amount, message } = req.body

        // สร้าง signature สำหรับ request
        const timestamp = Math.floor(Date.now() / 1000)
        const signatureString = `${TRUEWALLET_MERCHANT_ID}${timestamp}${amount}`
        const signature = crypto
            .createHmac('sha256', TRUEWALLET_PRIVATE_KEY)
            .update(signatureString)
            .digest('hex')

        // ส่ง request ไปที่ TrueWallet API
        const response = await axios.post('https://api.truewallet.com/gift-voucher/create', {
            merchantId: TRUEWALLET_MERCHANT_ID,
            amount: amount,
            message: message || 'Gift Voucher',
            timestamp: timestamp,
            signature: signature
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TRUEWALLET_PUBLIC_KEY}`
            }
        })

        // สร้างข้อมูลธุรกรรม
        const transaction = {
            id: generateTransactionId(),
            amount: amount,
            voucherId: response.data.voucherId,
            type: 'TRUEWALLET_GIFT',
            status: 'PENDING',
            createdAt: new Date()
        }

        // บันทึกลง database
        saveTransaction(transaction)

        res.json({
            success: true,
            data: {
                reference: transaction.id,
                amount: amount,
                voucherId: response.data.voucherId,
                deepLink: response.data.deepLink // ลิงก์สำหรับเปิดแอพ TrueWallet
            }
        })

    } catch (error) {
        console.error('Error creating TrueWallet gift:', error)
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการสร้างอั่งเปา'
        })
    }
})

// API ตรวจสอบสถานะการชำระเงิน
app.get('/api/payment/status/:referenceId', async (req, res) => {
    try {
        const { referenceId } = req.params
        
        // ดึงข้อมูลธุรกรรมจาก database
        const transaction = getTransaction(referenceId)
        
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบข้อมูลการชำระเงิน'
            })
        }

        res.json({
            success: true,
            data: {
                status: transaction.status,
                amount: transaction.amount,
                type: transaction.type,
                createdAt: transaction.createdAt
            }
        })

    } catch (error) {
        console.error('Error checking payment status:', error)
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะ'
        })
    }
})

// Webhook สำหรับรับการแจ้งเตือนจาก TrueWallet
app.post('/api/webhook/truewallet', async (req, res) => {
    try {
        const { voucherId, status } = req.body
        
        // ตรวจสอบ signature จาก header
        const isValid = validateTrueWalletWebhook(req)
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid signature' })
        }

        // อัพเดทสถานะธุรกรรม
        updateTransactionStatus(voucherId, status)

        res.json({ success: true })

    } catch (error) {
        console.error('Error processing webhook:', error)
        res.status(500).json({ success: false })
    }
})

// Utility functions
function generateTransactionId() {
    return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`
}

// ฟังก์ชันจำลองการจัดการ database
let transactions = []

function saveTransaction(transaction) {
    transactions.push(transaction)
}

function getTransaction(id) {
    return transactions.find(t => t.id === id)
}

function updateTransactionStatus(voucherId, status) {
    const transaction = transactions.find(t => t.voucherId === voucherId)
    if (transaction) {
        transaction.status = status
    }
}

function validateTrueWalletWebhook(req) {
    // ตรวจสอบ signature จาก TrueWallet
    // โค้ดนี้ต้องปรับตามเอกสาร API ของ TrueWallet
    return true
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})