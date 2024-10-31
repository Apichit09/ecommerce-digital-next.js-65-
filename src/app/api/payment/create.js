import { prisma } from '@/lib/prisma'
import { generatePayload } from 'promptpay-qr'
import QRCode from 'qrcode'

export async function POST(req) {
  try {
    const { type, amount, userId } = await req.json()

    // สร้าง transaction record
    const transaction = await prisma.topupTransaction.create({
      data: {
        userId,
        amount,
        paymentType: type,
        status: 'PENDING'
      }
    })

    let response = {}
    
    if (type === 'promptpay') {
      const settings = await prisma.topupSetting.findFirst()
      const payload = generatePayload(settings.accountNumber, { amount })
      const qrCode = await QRCode.toDataURL(payload)
      response = { qrCode }
    } else if (type === 'truewallet') {
      // เพิ่มโค้ดสำหรับสร้างลิงก์ TrueWallet
      response = { deepLink: 'truewallet://payment...' }
    }

    return Response.json({
      success: true,
      data: {
        ...response,
        transactionId: transaction.id
      }
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return Response.json(
      { success: false, message: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    )
  }
}