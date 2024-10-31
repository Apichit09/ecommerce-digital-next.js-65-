"use client";
import Image from 'next/image'
import Link from 'next/link'
import { FaHome, FaShoppingCart, FaMoneyBillWave, FaQuestionCircle, FaBars, FaUserCircle } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const Navbar = ({ siteName, logoPath, bannerPath }) => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })

    // ปิด dropdown เมื่อคลิกนอกพื้นที่
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // เมนูสำหรับ Admin
  const adminMenu = [
    { label: 'โปรไฟล์', href: '/profile' },
    { label: 'จัดการสินค้า', href: '/admin/products' },
    { label: 'จัดการผู้ใช้', href: '/admin/users' },
    { label: 'จัดการเว็บไซต์', href: '/admin/settings' },
    { label: 'ประวัติการซื้อ', href: '/history' },
    { label: 'ประวัติการเติมเงิน', href: '/payment-history' },
  ]

  // เมนูสำหรับ User
  const userMenu = [
    { label: 'โปรไฟล์', href: '/profile' },
    { label: 'แก้ไขโปรไฟล์', href: '/profile/edit' },
    { label: 'ประวัติการซื้อ', href: '/history' },
    { label: 'ประวัติการเติมเงิน', href: '/payment-history' },
  ]

  const menuItems = session?.user?.role === 'ADMIN' ? adminMenu : userMenu

  return (
    <nav className="w-full font-kanit fixed top-0 z-50 drop-shadow-[0_0_25px_rgba(255,211,105,0.25)]">
      {/* Banner Section */}
      <div className="relative w-full h-[60px] md:h-[80px] lg:h-[100px]">
        <Image
          src={bannerPath}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="h-[60px] bg-[#222831] flex items-center justify-between px-4 lg:px-14">
        {/* Left Side - Logo & Site Name */}
        <div className="flex items-center gap-4" data-aos="fade-right">
          <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] -mt-4 md:-mt-6 lg:-mt-8">
            <Image
              src={logoPath}
              alt="Logo"
              fill
              className="rounded-full object-cover shadow-md"
            />
          </div>
          <span className="text-[18px] md:text-[20px] lg:text-[24px] text-[#eeeeee] hidden md:block">
            {siteName}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-[#eeeeee] text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-[#eeeeee]" data-aos="fade-left">
          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-[18px]">
            <Link href="/" className="nav-link flex items-center gap-2 hover:text-[#FFD369] relative">
              <FaHome /> หน้าแรก
            </Link>
            <Link href="/products" className="nav-link flex items-center gap-2 hover:text-[#FFD369] relative">
              <FaShoppingCart /> สินค้า
            </Link>
            <Link href="/topup" className="nav-link flex items-center gap-2 hover:text-[#FFD369] relative">
              <FaMoneyBillWave /> เติมเงิน
            </Link>
            <Link href="/howto" className="nav-link flex items-center gap-2 hover:text-[#FFD369] relative">
              <FaQuestionCircle /> วิธีการ
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <div className="text-[#eeeeee] text-2xl">|</div>
            {session ? (
              <div className="flex items-center gap-4" ref={profileRef}>
                {/* ยอดเงิน */}
                <div className="bg-[#FFD369] text-[#222831] px-4 py-2 rounded-full">
                  ฿{session.user.balance || 0}
                </div>
                {/* โปรไฟล์ */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative w-10 h-10 rounded-full overflow-hidden"
                  >
                    <Image
                      src={session.user.image || '/default-avatar.png'}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </button>
                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-600">สวัสดี</p>
                        <p className="font-medium text-gray-800">{session.user.name}</p>
                      </div>
                      {menuItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <button className="h-[40px] w-[100px] md:w-[127px] text-sm md:text-base rounded-full bg-[#FFD369] text-[#222831] font-medium hover:opacity-90 transition-all duration-300 hover:scale-105">
                    ล็อคอิน
                  </button>
                </Link>
                <Link href="/register">
                  <button className="h-[40px] w-[100px] md:w-[127px] text-sm md:text-base rounded-full border-2 border-[#eeeeee] text-[#eeeeee] font-medium hover:bg-[#eeeeee] hover:text-[#222831] transition-all duration-300 hover:scale-105">
                    สมัครสมาชิก
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-[#222831] transition-all duration-300 ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden`}>
        <div className="px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-[#eeeeee] flex items-center gap-2 hover:text-[#FFD369]">
            <FaHome /> หน้าแรก
          </Link>
          <Link href="/products" className="text-[#eeeeee] flex items-center gap-2 hover:text-[#FFD369]">
            <FaShoppingCart /> สินค้า
          </Link>
          <Link href="/topup" className="text-[#eeeeee] flex items-center gap-2 hover:text-[#FFD369]">
            <FaMoneyBillWave /> เติมเงิน
          </Link>
          <Link href="/howto" className="text-[#eeeeee] flex items-center gap-2 hover:text-[#FFD369]">
            <FaQuestionCircle /> วิธีการ
          </Link>
          {session ? (
            <>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={session.user.image || '/default-avatar.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-[#eeeeee]">{session.user.name}</p>
                    <p className="text-[#FFD369]">฿{session.user.balance || 0}</p>
                  </div>
                </div>
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block py-2 text-[#eeeeee] hover:text-[#FFD369]"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => signOut()}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300"
                >
                  ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-700">
              <Link href="/login">
                <button className="h-[40px] w-full rounded-full bg-[#FFD369] text-[#222831] font-medium hover:opacity-90">
                  ล็อคอิน
                </button>
              </Link>
              <Link href="/register">
                <button className="h-[40px] w-full rounded-full border-2 border-[#eeeeee] text-[#eeeeee] font-medium hover:bg-[#eeeeee] hover:text-[#222831]">
                  สมัครสมาชิก
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;