"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductCard = ({ products }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-[#eeeeee] py-10">
        ไม่พบสินค้าในหมวดหมู่นี้
      </div>
    );
  }

  const handleBuyClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="max-w-[1090px] mx-auto px-4 lg:px-0 font-kanit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-full max-w-[320px] h-[370px] mx-auto bg-[#222831] rounded-[40px] p-4 group transition-all duration-300 hover:scale-105"
          >
            {/* Image Container - ทำเป็น Link */}
            <Link href={`/products/${product.id}`}>
              <div className="relative w-full h-[230px] rounded-[40px] overflow-hidden mb-4 cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="text-[#eeeeee] px-2">
              {/* ชื่อสินค้าเป็น Link */}
              <Link href={`/products/${product.id}`}>
                <h3 className="text-2xl font-bold mb-1 hover:text-[#FFD369] transition-colors cursor-pointer">
                  {product.name}
                </h3>
              </Link>
              <p className="text-1xl mb-2 opacity-80">{product.description}</p>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold mt-3 ml-2">{product.price}</span>
                  <button 
                    onClick={() => handleBuyClick(product.id)}
                    className="w-[130px] h-[50px] bg-[#FFD369] text-[#222831] rounded-full text-xl font-bold 
                    hover:bg-opacity-90 transition-all duration-300 active:scale-95"
                  >
                    ซื้อ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;