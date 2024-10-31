"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import ProductCard from "@/app/components/ProductCard/page";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CategoryPage({ params }) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 6;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchData = async () => {
      try {
        // ดึงข้อมูล WebsiteInfo
        const infoResponse = await fetch('/api/website-info');
        const infoData = await infoResponse.json();
        setWebsiteInfo(infoData);

        // ดึงข้อมูล Category
        const categoryResponse = await fetch(`/api/categories/${params.id}`);
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        // ดึงข้อมูล Products ในหมวดหมู่
        const productsResponse = await fetch(`/api/categories/${params.id}/products`);
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return <div className="text-white">กำลังโหลด...</div>;
  }

  if (!category) {
    return <div className="text-white">ไม่พบหมวดหมู่ที่ต้องการ</div>;
  }

  // คำนวณการแบ่งหน้า
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <main className="min-h-screen bg-[#393E46]">
      <Navbar 
        siteName={websiteInfo.name}
        logoPath={websiteInfo.logoUrl}
        bannerPath={websiteInfo.navbarImage}
      />

      <div className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
        {/* Category Banner */}
        <div className="max-w-[1090px] mx-auto px-4 lg:px-0 mb-10" data-aos="fade-up">
          <h2 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit">
            {category.name}
          </h2>
          <div className="relative w-full aspect-[3/1] rounded-[40px] overflow-hidden drop-shadow-[0_0_25px_rgba(255,211,105,0.25)]">
            <img
              src={category.imageLink}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <h3 className="text-white text-3xl md:text-4xl font-medium">
                {category.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-10">
          <h3 className="text-[20px] text-[#eeeeee] font-medium mb-6 font-kanit max-w-[1090px] mx-auto px-4 lg:px-0">
            สินค้าในหมวดหมู่
          </h3>
          <ProductCard products={currentProducts} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === page
                      ? "bg-[#FFD369] text-[#222831]"
                      : "bg-[#222831] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#222831]"
                  } transition-colors duration-300`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}