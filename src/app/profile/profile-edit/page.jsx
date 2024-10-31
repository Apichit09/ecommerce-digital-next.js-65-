"use client";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProfileEdit() {
  // State for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // State for form data
  const [formData, setFormData] = useState({
    username: "johndoe",
    email: "john@example.com",
    profileImage: "https://img5.pic.in.th/file/secure-sv1/10d496c5aeef840b3.jpg",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#393E46] flex flex-col">
      <Navbar
        siteName="GameIDshop"
        logoPath="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
        bannerPath="https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png"
      />

      <main className="flex-1 container mx-auto px-4 py-8 mt-[120px] md:mt-[140px] lg:mt-[160px]">
        <div className="max-w-[800px] mx-auto bg-[#222831] rounded-[30px] p-8 md:p-10 border-2 border-[#FFD369] shadow-lg shadow-[#FFD369]/20" data-aos="fade-up">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] relative rounded-full overflow-hidden mb-6 border-4 border-[#FFD369] shadow-xl">
              <Image
                src={formData.profileImage}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Profile Image URL Input */}
            <div className="w-full max-w-md mt-4">
              <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                ลิงค์รูปโปรไฟล์
              </label>
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="bg-[#393E46] rounded-2xl p-6 space-y-6">
              <h3 className="text-[#FFD369] font-kanit text-xl font-bold mb-4">
                เปลี่ยนรหัสผ่าน
              </h3>
              
              {/* Old Password */}
              <div>
                <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                  รหัสผ่านเดิม
                </label>
                <div className="relative">
                  <input
                    type={passwordVisibility.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('oldPassword')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#222831] transition-colors duration-300"
                  >
                    {passwordVisibility.oldPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                  รหัสผ่านใหม่
                </label>
                <div className="relative">
                  <input
                    type={passwordVisibility.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#222831] transition-colors duration-300"
                  >
                    {passwordVisibility.newPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-[#FFD369] font-kanit text-lg mb-2">
                  ยืนยันรหัสผ่านใหม่
                </label>
                <div className="relative">
                  <input
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-[45px] bg-[#eeeeee] rounded-xl px-4 text-[#222831] font-kanit focus:outline-none focus:ring-2 focus:ring-[#FFD369] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#222831] transition-colors duration-300"
                  >
                    {passwordVisibility.confirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-[#FFD369] text-[#222831] font-kanit font-bold text-lg px-8 py-3 rounded-full hover:bg-[#ffc107] transition-all duration-300 transform hover:scale-105"
              >
                บันทึกการเปลี่ยนแปลง
              </button>
              <a
                href="/profile"
                className="bg-gray-500 text-white font-kanit font-bold text-lg px-8 py-3 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                ยกเลิก
              </a>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}