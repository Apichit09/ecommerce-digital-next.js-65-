"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLine, FaInstagram, FaDiscord } from "react-icons/fa";
import { MdHistory, MdPayment } from "react-icons/md";

const platformIcons = {
  Facebook: FaFacebook,
  Line: FaLine,
  Instagram: FaInstagram,
  Discord: FaDiscord
};

const Footer = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลการติดต่อ
        const contactResponse = await fetch('/api/contact-info');
        const contactData = await contactResponse.json();
        setContactInfo(contactData);

        // ดึงข้อมูลเว็บไซต์
        const websiteResponse = await fetch('/api/website-info');
        const websiteData = await websiteResponse.json();
        setWebsiteInfo(websiteData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-[#222831] text-[#eeeeee] py-8 font-kanit">
      <div className="max-w-[1090px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-24 h-24 mb-2">
              <Image
                src={websiteInfo?.logoUrl || "https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"}
                alt={websiteInfo?.name || "gameIDshop"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                loading="eager"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{websiteInfo?.name || "gameIDshop"}</h2>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ช่องทางการติดต่อ</h3>
            <div className="space-y-3">
              {contactInfo.map((contact) => {
                const Icon = platformIcons[contact.platform] || FaDiscord;
                return (
                  <Link
                    key={contact.id}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#FFD369] transition-colors"
                  >
                    <Icon className="text-2xl" />
                    <span>{contact.platform}</span>
                  </Link>
                );
              })}
              <p className="flex items-center gap-2 text-[#FFD369]">
                @ สวัสดีครับ
              </p>
            </div>
          </div>

          {/* History Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ประวัติการทำรายการ</h3>
            <div className="space-y-3">
              <Link
                href="/history"
                className="flex items-center gap-2 hover:text-[#FFD369] transition-colors"
              >
                <MdHistory className="text-2xl" />
                <span>ประวัติการทำรายการ</span>
              </Link>
              <Link
                href="/payment-history"
                className="flex items-center gap-2 hover:text-[#FFD369] transition-colors"
              >
                <MdPayment className="text-2xl" />
                <span>ประวัติการเติมเงิน</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;