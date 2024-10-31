"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ForgotPassword() {
  const [step, setStep] = useState(1) // 1 = email, 2 = verification code
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    // TODO: Add email submission logic here
    setStep(2) // Move to verification step
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    // TODO: Add verification logic here
  }

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex items-center justify-center p-4">
      <div 
        className="w-full max-w-[480px] bg-[#FFD369] rounded-[40px] p-6 shadow-[0_0_25px_rgba(255,211,105,0.25)]"
        data-aos="fade-up"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6" data-aos="zoom-in" data-aos-delay="200">
          <div className="w-[135px] h-[125px] relative rounded-full overflow-hidden mb-3">
            <Image
              src="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
              alt="GameIDShop Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-[26px] text-[#eeeeee] font-kanit font-bold">ลืมรหัสผ่าน</h1>
        </div>

        {step === 1 ? (
          // Email Form
          <form onSubmit={handleSubmitEmail} className="space-y-4" data-aos="fade-up" data-aos-delay="400">
            <div>
              <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
                กรุณากรอกอีเมล์ของคุณ
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
                placeholder="example@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-[165px] h-[45px] bg-[#eeeeee] rounded-[20px] text-[#222831] font-kanit font-bold text-lg mx-auto block hover:bg-[#e0e0e0] transition-all duration-300 hover:scale-105 mt-6"
            >
              ส่งรหัสยืนยัน
            </button>
          </form>
        ) : (
          // Verification Code Form
          <form onSubmit={handleVerifyCode} className="space-y-4" data-aos="fade-up" data-aos-delay="400">
            <div>
              <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
                กรอกรหัสยืนยันที่ส่งไปยังอีเมล์
              </label>
              <p className="text-sm text-gray-600 font-kanit mb-4">
                รหัสยืนยันถูกส่งไปที่: {email}
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
                placeholder="กรอกรหัสยืนยัน 6 หลัก"
                maxLength={6}
                required
              />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className="w-[165px] h-[45px] bg-[#eeeeee] rounded-[20px] text-[#222831] font-kanit font-bold text-lg mx-auto block hover:bg-[#e0e0e0] transition-all duration-300 hover:scale-105"
              >
                ยืนยันรหัส
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#222831] font-kanit text-sm hover:underline mx-auto"
              >
                แก้ไขอีเมล์
              </button>
            </div>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="text-center font-kanit mt-4 text-sm" data-aos="fade-up" data-aos-delay="800">
          <a 
            href="/login" 
            className="text-[#222831] font-semibold hover:underline"
          >
            กลับไปหน้าเข้าสู่ระบบ
          </a>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-3 text-center text-[#eeeeee] font-kanit text-xs">
        © ลิขสิทธิ์ ทุกอย่าง
      </div>
    </div>
  )
}