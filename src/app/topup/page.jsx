'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar/page'
import Footer from '../components/Footer/page'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function TopupPage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [selectedPayment, setSelectedPayment] = useState('')
  const [amount, setAmount] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
    
    // ดึงข้อมูลตั้งค่าการเติมเงิน
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/topup/settings')
      const data = await response.json()
      if (data.success) {
        setSettings(data.data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!session) {
      alert('กรุณาเข้าสู่ระบบก่อนทำการเติมเงิน')
      router.push('/login')
      return
    }

    if (!selectedPayment || !amount) {
      alert('กรุณาเลือกช่องทางชำระเงินและระบุจำนวนเงิน')
      return
    }

    try {
      // สร้าง QR Code หรือ อั่งเปา ตามช่องทางที่เลือก
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: selectedPayment,
          amount: parseFloat(amount),
          userId: session.user.id
        })
      })

      const data = await response.json()
      if (data.success) {
        setQrCode(data.data.qrCode) // สำหรับ promptpay
        // หรือ window.location.href = data.data.deepLink // สำหรับ truewallet
        setShowPopup(true)
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      alert('เกิดข้อผิดพลาดในการสร้างการชำระเงิน')
    }
  }

  const handleConfirmPayment = async () => {
    try {
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session.user.id,
          amount: parseFloat(amount),
          type: selectedPayment
        })
      })

      const data = await response.json()
      if (data.success) {
        alert('บันทึกการชำระเงินเรียบร้อย กรุณารอการตรวจสอบ')
        setShowPopup(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกการชำระเงิน')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-[#393E46]">
      <Navbar 
        siteName="GameIDshop"
        logoPath="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
        bannerPath="https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png"
      />
      
      <div className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
        <div className="max-w-[1090px] mx-auto px-4 lg:px-0">
          
          {/* หัวข้อ */}
          <h1 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit text-center mt-5"
              data-aos="fade-down">
            เติมเงิน
          </h1>

          {/* การ์ดเติมเงิน */}
          <div className="bg-[#222831] rounded-[40px] p-8 mb-8"
               data-aos="fade-up">
            {/* ปุ่มจำนวนเงิน */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[100, 300, 500, 500].map((value, i) => (
                <button
                  key={i}
                  onClick={() => setAmount(value)}
                  className="bg-[#FFD369] hover:opacity-90 transition-all duration-300 
                           text-[#222831] font-bold py-3 px-6 rounded-full"
                >
                  {value}
                </button>
              ))}
            </div>

            {/* ช่องกรอกจำนวนเงิน */}
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="ระบุจำนวนเงิน"
              className="w-full bg-[#393E46] text-[#eeeeee] rounded-[20px] px-4 py-3 mb-6 outline-none"
            />

            {/* ช่องทางชำระเงิน */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6 font-kanit">
              <button 
                onClick={() => setSelectedPayment('promptpay')}
                className={`${
                  selectedPayment === 'promptpay' 
                    ? 'bg-[#FFD369] text-[#222831]' 
                    : 'bg-[#eeeeee] text-[#222831]'
                } hover:opacity-90 transition-all duration-300 
                font-bold py-3 px-6 rounded-[20px] flex-1`}
              >
                QR Code พร้อมเพย์
              </button>
              <button 
                onClick={() => setSelectedPayment('truewallet')}
                className={`${
                  selectedPayment === 'truewallet' 
                    ? 'bg-[#FFD369] text-[#222831]' 
                    : 'bg-[#eeeeee] text-[#222831]'
                } hover:opacity-90 transition-all duration-300
                font-bold py-3 px-6 rounded-[20px] flex-1`}
              >
                อังเปา TrueWallet
              </button>
            </div>

            {/* ปุ่มชำระเงิน */}
            <button 
              onClick={handlePayment}
              className="w-full bg-[#FFD369] hover:opacity-90 transition-all duration-300
                       text-[#222831] font-bold py-4 rounded-[20px]"
            >
              ชำระเงิน
            </button>
          </div>

          {/* วิธีการเติมเงิน */}
          <div className="mb-10">
            <h2 className="text-[20px] text-[#eeeeee] font-medium mb-6 font-kanit">
              วิธีการเติมเงิน
            </h2>
            <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden"
                 data-aos="zoom-in">
              <Image
                src="https://img5.pic.in.th/file/secure-sv1/10d496c5aeef840b3.jpg"
                alt="วิธีการเติมเงิน"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#FFD369] p-6 rounded-[20px] w-[90%] max-w-[400px]">
            <h3 className="text-[#222831] text-xl font-bold mb-4 font-kanit">GameIDShop</h3>
            <div className="bg-white rounded-[15px] p-4 mb-4">
              <div className="aspect-square w-full max-w-[200px] mx-auto mb-4">
                <Image
                  src={selectedPayment === 'promptpay' ? qrCode : settings.qrImage}
                  alt="QR Code"
                  width={200}
                  height={200}
                />
              </div>
              <p className="text-[#222831] font-kanit mb-2">
                ชื่อบัญชี: {settings.accountName}
              </p>
              <p className="text-[#222831] font-kanit">
                {selectedPayment === 'promptpay' ? 'พร้อมเพย์: ' : 'เบอร์ทรูวอเลท: '}
                {settings.accountNumber}
              </p>
              <p className="text-[#222831] font-kanit">
                จำนวนเงิน: {amount} บาท
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-red-500 text-white py-2 rounded-full font-kanit hover:opacity-90"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-green-500 text-white py-2 rounded-full font-kanit hover:opacity-90"
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}