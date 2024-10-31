"use client";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ข้อมูลจำลอง
const mockTransactions = [
  {
    date: "02/09/2024",
    method: "ชำระเงินผ่าน QR Code",
    amount: 300,
    status: "เรียบร้อย"
  },
  {
    date: "05/09/2024",
    method: "ชำระเงินผ่าน อั้งเปา True Wallet",
    amount: 300,
    status: "กำลังดำเนินการ"
  },
  {
    date: "10/09/2024",
    method: "ชำระเงินผ่าน Mobile Banking",
    amount: 500,
    status: "เรียบร้อย"
  },
  // เพิ่มข้อมูลจำลองตามต้องการ
];

export default function TopupHistory() {
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
          className="max-w-[1000px] mx-auto bg-[#222831] rounded-[30px] p-6 md:p-8 border-2 border-[#FFD369] shadow-lg shadow-[#FFD369]/20"
          data-aos="fade-up"
        >
          <h1 className="text-[#FFD369] font-kanit text-2xl md:text-3xl font-bold mb-6 text-center">
            ประวัติการเติมเงิน
          </h1>

          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#393E46]">
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-left">วันที่</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-left">วิธีการชำระเงิน</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-right">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockTransactions.map((transaction, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-[#2c3440] transition-colors duration-200"
                  >
                    <td className="px-4 py-4 text-white font-kanit">{transaction.date}</td>
                    <td className="px-4 py-4 text-white font-kanit">{transaction.method}</td>
                    <td className="px-4 py-4 text-white font-kanit text-right">{transaction.amount}</td>
                    <td className="px-4 py-4">
                      <span 
                        className={`inline-block rounded-full px-3 py-1 text-sm font-kanit text-center w-full max-w-[140px] ${
                          transaction.status === "เรียบร้อย"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          <div className="mt-8 space-y-2 text-white font-kanit text-sm">
            <p>• ได้รับเงินทันทีหลังชำระเงินสำหรับการชำระเงินผ่านช่องทางอัตโนมัติ</p>
            <p>• อย่าลืมทำการคัดลูกเมล Email ก่อนทำการชำระเงิน</p>
            <p>• หมายเหตุ กดที่ช่องสถานะเพื่อดูรายละเอียด</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}