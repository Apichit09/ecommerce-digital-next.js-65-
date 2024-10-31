"use client";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Profile() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#393E46] flex flex-col">
      <Navbar
        siteName="GameIDshop"
        logoPath="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
        bannerPath="https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png"
      />

      <main className="flex-1 container mx-auto px-4 py-8 mt-[120px] md:mt-[140px] lg:mt-[160px]">
        <div
          className="max-w-[800px] mx-auto bg-[#222831] rounded-[30px] p-8 md:p-10 border-2 border-[#FFD369] shadow-lg shadow-[#FFD369]/20"
          data-aos="fade-up"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] relative rounded-full overflow-hidden mb-6 border-4 border-[#FFD369] shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://img5.pic.in.th/file/secure-sv1/10d496c5aeef840b3.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              {/* Left Column */}
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  Username
                </h2>
                <p className="text-white font-kanit text-lg">johndoe</p>
              </div>
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  E-mail
                </h2>
                <p className="text-white font-kanit text-lg">
                  john@example.com
                </p>
              </div>
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  เป็นสมาชิกเมื่อ
                </h2>
                <p className="text-white font-kanit text-lg">01/01/2024</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Right Column */}
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  เงินในกระเป๋า
                </h2>
                <p className="text-white font-kanit text-2xl font-bold">
                  ฿2,000
                </p>
              </div>
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  ซื้อครบ
                </h2>
                <p className="text-white font-kanit text-2xl font-bold">
                  13 ไอดี
                </p>
              </div>
              <div className="bg-[#393E46] rounded-2xl p-6 hover:bg-[#32363d] transition-colors duration-300">
                <h2 className="text-[#FFD369] font-kanit text-xl font-bold mb-2">
                  สถานะ
                </h2>
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-kanit text-sm">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* History Link */}
          <div className="text-center mb-10">
            <a
              href="/history"
              className="inline-block bg-[#FFD369] text-[#222831] font-kanit font-bold text-lg px-8 py-3 rounded-full hover:bg-[#ffc107] transition-colors duration-300 transform hover:scale-105"
            >
              ดูประวัติการซื้อ
            </a>
          </div>

          {/* Status Boxes */}
          <div className="space-y-8">
            {/* ประเภทการชำระเงิน */}
            <div>
              <h3 className="text-[#FFD369] font-kanit text-xl font-bold mb-4">
                ประเภทการชำระเงิน
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#393E46] rounded-2xl p-4 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-kanit">บัตรเครดิต</span>
                </div>
                <div className="bg-[#393E46] rounded-2xl p-4 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-kanit">บัตรเดบิต</span>
                </div>
                <div className="bg-[#393E46] rounded-2xl p-4 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-kanit">ธนาคารออนไลน์</span>
                </div>
                <div className="bg-[#393E46] rounded-2xl p-4 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-kanit">QR Payment</span>
                </div>
              </div>
            </div>

            {/* ประวัติการทำรายการ */}
            <div>
              <h3 className="text-[#FFD369] font-kanit text-xl font-bold mb-4">
                ประวัติการทำรายการ
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#393E46] rounded-2xl p-6 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <div className="text-[#FFD369] font-bold text-2xl mb-2">
                    150
                  </div>
                  <span className="text-white font-kanit">การซื้อทั้งหมด</span>
                </div>
                <div className="bg-[#393E46] rounded-2xl p-6 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <div className="text-[#FFD369] font-bold text-2xl mb-2">
                    ฿15,000
                  </div>
                  <span className="text-white font-kanit">ยอดซื้อทั้งหมด</span>
                </div>
                <div className="bg-[#393E46] rounded-2xl p-6 text-center hover:bg-[#32363d] transition-all duration-300 transform hover:scale-105">
                  <div className="text-[#FFD369] font-bold text-2xl mb-2">
                    25
                  </div>
                  <span className="text-white font-kanit">การเติมเงิน</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
