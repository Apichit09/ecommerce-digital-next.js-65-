'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar/page'
import Footer from '../components/Footer/page'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function HowtoPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

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
          <h1 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit text-center"
              data-aos="fade-down">
            วิธีการใช้งาน
          </h1>

          {/* การ์ดวิธีการใช้งาน */}
          <div className="bg-[#222831] rounded-[40px] p-8 mb-8"
               data-aos="fade-up">
            
            {/* รูปวิธีการใช้งาน */}
            <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden mb-6">
              <Image
                src="https://img5.pic.in.th/file/secure-sv1/howto-image.jpg" // ใส่รูปวิธีการใช้งานของคุณ
                alt="วิธีการใช้งาน"
                fill
                className="object-contain"
              />
            </div>

            {/* ขั้นตอนการใช้งาน */}
            <div className="space-y-6 text-[#eeeeee] font-kanit">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD369] text-[#222831] flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <p>เข้าสู่ระบบ TrueWallet ของคุณ</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD369] text-[#222831] flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <p>กดที่ปุ่ม "ส่งเงิน" ในหน้าหลัก</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD369] text-[#222831] flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <p>ระบุจำนวนเงินที่ต้องการเติม</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD369] text-[#222831] flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <p>กดปุ่ม "ส่งเงิน" เพื่อยืนยันการทำรายการ</p>
              </div>
            </div>
          </div>

          {/* ช่องทางการติดต่อ */}
          <div className="bg-[#222831] rounded-[40px] p-8 mb-8"
               data-aos="fade-up">
            <h2 className="text-[20px] text-[#eeeeee] font-bold mb-6 font-kanit">
              ช่องทางการติดต่อ
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="bg-[#FFD369] hover:opacity-90 transition-all duration-300 
                                   text-[#222831] font-bold py-3 px-6 rounded-[20px] text-center">
                ช่องทางที่ 1
              </a>
              <a href="#" className="bg-[#FFD369] hover:opacity-90 transition-all duration-300
                                   text-[#222831] font-bold py-3 px-6 rounded-[20px] text-center">
                ช่องทางที่ 2
              </a>
              <a href="#" className="bg-[#FFD369] hover:opacity-90 transition-all duration-300
                                   text-[#222831] font-bold py-3 px-6 rounded-[20px] text-center">
                ช่องทางที่ 3
              </a>
              <a href="#" className="bg-[#FFD369] hover:opacity-90 transition-all duration-300
                                   text-[#222831] font-bold py-3 px-6 rounded-[20px] text-center">
                ช่องทางที่ 4
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}