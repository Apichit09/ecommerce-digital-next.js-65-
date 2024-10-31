"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import ProductCard from "@/app/components/ProductCard/page";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchData = async () => {
      try {
        // ดึงข้อมูลเว็บไซต์
        const websiteResponse = await fetch('/api/website-info');
        if (websiteResponse.ok) {
          const websiteData = await websiteResponse.json();
          setWebsiteInfo(websiteData);
        }

        // ดึงข้อมูลสินค้า
        const productResponse = await fetch(`/api/products/${id}`);
        if (!productResponse.ok) {
          throw new Error('ไม่พบสินค้า');
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // ดึงสินค้าแนะนำ
        const recommendedResponse = await fetch('/api/products/recommended');
        if (recommendedResponse.ok) {
          const recommendedData = await recommendedResponse.json();
          setRecommendedProducts(recommendedData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePurchase = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      setIsPurchasing(true);
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          price: product.price
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'การซื้อสินค้าล้มเหลว');
      }

      alert('ซื้อสินค้าสำเร็จ!');
      router.push('/profile');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsPurchasing(false);
    }
  };

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

  if (!product || !websiteInfo) {
    return (
      <div className="min-h-screen bg-[#393E46] flex items-center justify-center">
        <div className="text-[#eeeeee] text-xl">ไม่พบข้อมูล</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#393E46]">
      <Navbar 
        siteName={websiteInfo.name}
        logoPath={websiteInfo.logoUrl}
        bannerPath={websiteInfo.navbarImage}
      />
    <div className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
      <div className="max-w-[1090px] mx-auto px-4 lg:px-0">
        <div className="bg-[#222831] rounded-[40px] p-8 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* รูปภาพสินค้า */}
            <div>
              <div className="relative w-full h-[400px] rounded-[20px] overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain bg-[#1a1e24]"
                />
              </div>
              {/* รูปย่อย */}
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-full h-[80px] rounded-[10px] overflow-hidden 
                    ${selectedImage === index ? "ring-2 ring-[#FFD369]" : ""}`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="20vw"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ข้อมูลสินค้า */}
            <div className="text-[#eeeeee] font-kanit">
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              <p className="mb-4">{product.description}</p>
              <p className="mb-4">หมวดหมู่: {product.category.name}</p>
              <p className="mb-6">จำนวนบัญชีที่เหลือ: {product.gameAccountsCount}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl">ราคา {product.price} บาท</span>
                <button
                  className="bg-[#FFD369] hover:opacity-90 transition-all duration-300 
                  text-[#222831] font-bold py-2 px-8 rounded-full"
                  disabled={product.gameAccountsCount === 0}
                >
                  {product.gameAccountsCount > 0 ? 'ซื้อ' : 'สินค้าหมด'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* สินค้าแนะนำ */}
        {recommendedProducts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[20px] text-[#eeeeee] font-bold mb-6 font-kanit">
              สินค้าแนะนำ
            </h2>
            <ProductCard products={recommendedProducts} />
          </div>
        )}
      </div>
    </div>
    <Footer />
  </main>
);
}
