"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import RecommendedProduct from "../components/RecommendedProduct/page";

export default function Products() {
  const [websiteInfo, setWebsiteInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลเว็บไซต์
        const websiteResponse = await fetch('/api/website-info');
        if (websiteResponse.ok) {
          const websiteData = await websiteResponse.json();
          setWebsiteInfo(websiteData);
        }

        // ดึงข้อมูลหมวดหมู่
        const categoriesResponse = await fetch('/api/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#393E46] flex items-center justify-center">
        <div className="text-[#eeeeee] text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#393E46] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#393E46]">
      {/* Navbar */}
      <Navbar 
        siteName={websiteInfo?.name || "GameIDshop"}
        logoPath={websiteInfo?.logoUrl || "https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"}
        bannerPath={websiteInfo?.navbarImage || "https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png"}
      />

      {/* Main Content */}
      <div className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit max-w-[1090px] mx-auto px-4 lg:px-0 mt-3">
            หมวดหมู่ทั้งหมด
          </h2>
          <RecommendedProduct 
            selectedCategories={categories.slice(0, 4).map(cat => cat.id)} 
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}