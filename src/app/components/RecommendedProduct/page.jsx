"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import AOS from "aos";
import "aos/dist/aos.css";

const RecommendedProduct = ({ selectedCategories = [1, 2] }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchData = async () => {
      try {
        // ดึงข้อมูลหมวดหมู่
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลหมวดหมู่ได้');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // ดึงข้อมูลสินค้าใหม่
        const productsResponse = await fetch('/api/products/new');
        if (!productsResponse.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayCategories = categories.filter(cat => 
    selectedCategories.includes(cat.id)
  );

  if (isLoading) {
    return <div className="text-center text-[#eeeeee]">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[1090px] mx-auto px-4 lg:px-0 font-kanit">
      {/* Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-10" data-aos="fade-up">
        {displayCategories.map((category) => (
          <Link href={`/category/${category.id}`} key={category.id}>
            <div className="relative w-full aspect-[3/1] rounded-[40px] overflow-hidden drop-shadow-[0_0_25px_rgba(255,211,105,0.25)] group cursor-pointer">
              <Image
                src={category.imageLink}
                alt={category.name}
                fill
                className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white text-xl md:text-2xl font-medium">
                  {category.name}
                </h3>
                <p className="text-[#FFD369] text-base md:text-lg mt-2">
                  คลิกเพื่อดูรายละเอียดเพิ่มเติม
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Products Section */}
      <div className="mt-10" data-aos="fade-up">
        <h2 className="text-[#eeeeee] text-2xl font-medium mb-6">
          สินค้าเพิ่มใหม่
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative w-[220px] h-[200px] mx-auto bg-[#222831] rounded-[20px] p-[3px] drop-shadow-[0_0_25px_rgba(255,211,105,0.25)] group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-[-3px] rounded-[22px] bg-[#FFD369] opacity-20 blur-[3px]"></div>
              <div className="relative w-full h-full bg-[#222831] rounded-[20px] overflow-hidden">
                <Image
                  src={product.images[0]?.url || '/default-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:blur-sm"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white text-xl md:text-2xl font-medium text-center px-4">
                    {product.name}
                  </h3>
                  <p className="text-[#FFD369] text-lg md:text-xl mt-3">
                    ฿{product.price}
                  </p>
                  <p className="text-white text-base mt-2">
                    สินค้าคงเหลือ: {product.gameAccounts.length}
                  </p>
                  <button 
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="mt-4 px-6 py-2 bg-[#FFD369] text-[#222831] rounded-full text-lg font-medium hover:opacity-90 transition-opacity duration-300"
                  >
                    สั่งซื้อเลย
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;