"use client";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ข้อมูลจำลอง
const mockPurchases = [
  {
    id: "ไอดีเกม1",
    gameId: "ashgdasjkdhas",
    password: "ashkkasdhasskj",
    date: "02/09/2024",
    price: 300,
    status: "เรียบร้อย"
  },
  {
    id: "ไอดีเกม2",
    gameId: "bsdf45sdf4s5",
    password: "df45sdf45sdf4",
    date: "05/09/2024",
    price: 500,
    status: "เรียบร้อย"
  },
  {
    id: "ไอดีเกม3",
    gameId: "67uhj78ikl89",
    password: "rtyu56yhju78",
    date: "10/09/2024",
    price: 800,
    status: "รอดำเนินการ"
  },
];

// Toast Component
const Toast = ({ message, type, show }) => {
  if (!show) return null;
  
  return (
    <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg font-kanit
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white
      transform transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-[-20px] opacity-0'}`}>
      <div className="flex items-center space-x-2">
        {type === 'success' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default function PurchaseHistory() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast(`คัดลอก${type}แล้ว`, 'success');
      })
      .catch(() => {
        showToast('ไม่สามารถคัดลอกได้', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-[#393E46] flex flex-col">
      <Navbar
        siteName="GameIDshop"
        logoPath="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
        bannerPath="https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png"
      />
      <Toast {...toast} />

      <main className="flex-1 container mx-auto px-4 py-8 mt-[120px] md:mt-[140px] lg:mt-[160px]">
        <div 
          className="max-w-[1000px] mx-auto bg-[#222831] rounded-[30px] p-6 md:p-8 border-2 border-[#FFD369] shadow-lg shadow-[#FFD369]/20"
          data-aos="fade-up"
        >
          <h1 className="text-[#FFD369] font-kanit text-2xl md:text-3xl font-bold mb-6 text-center">
            ประวัติการซื้อ
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#393E46]">
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-left">ซื้อไอดี</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-left">รหัสเกม</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-left">รหัสผ่าน</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-center">วันที่ซื้อ</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-right">ราคา</th>
                  <th className="px-4 py-3 text-[#FFD369] font-kanit text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockPurchases.map((purchase, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-[#2c3440] transition-colors duration-200"
                  >
                    <td className="px-4 py-4 text-white font-kanit">{purchase.id}</td>
                    <td className="px-4 py-4">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer hover:bg-[#393E46] p-2 rounded-lg group transition-all duration-200"
                        onClick={() => handleCopy(purchase.gameId, 'ไอดีเกม')}
                      >
                        <span className="text-white font-kanit">ID: </span>
                        <span className="text-[#FFD369] font-kanit group-hover:text-white">{purchase.gameId}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer hover:bg-[#393E46] p-2 rounded-lg group transition-all duration-200"
                        onClick={() => handleCopy(purchase.password, 'รหัสผ่าน')}
                      >
                        <span className="text-white font-kanit">Pass: </span>
                        <span className="text-[#FFD369] font-kanit group-hover:text-white">{purchase.password}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white font-kanit text-center">{purchase.date}</td>
                    <td className="px-4 py-4 text-white font-kanit text-right">{purchase.price}</td>
                    <td className="px-4 py-4">
                      <span 
                        className={`inline-block rounded-full px-3 py-1 text-sm font-kanit text-center w-full max-w-[140px] ${
                          purchase.status === "เรียบร้อย"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          <div className="mt-8 space-y-2 text-white font-kanit text-sm">
            <p>• ได้รับสินค้าทันทีหลังชำระเงินสำหรับการชำระเงินผ่านช่องทางอัตโนมัติ</p>
            <p>• รหัสผ่านสำหรับเข้าเกมและ Email ต้องตรงกัน</p>
            <p>• หมายเหตุ คลิกที่ไอดีหรือรหัสผ่านเพื่อคัดลอก</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}