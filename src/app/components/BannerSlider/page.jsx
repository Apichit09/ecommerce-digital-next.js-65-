"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'aos/dist/aos.css';

const BannerSlider = ({ banners = [] }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div 
      className="max-w-[1090px] mx-auto my-5 md:my-15 px-4 lg:px-0 mt-10 mb-10"
      data-aos="fade-up"
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-[200px] sm:h-[250px] md:h-[320px] rounded-[40px] drop-shadow-[0_0_25px_rgba(255,211,105,0.25)]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
              <Image
                src={banner.imageLink}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover rounded-[40px]"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;