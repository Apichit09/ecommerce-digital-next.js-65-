"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return false
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'การสมัครสมาชิกล้มเหลว')
      }

      // สมัครสำเร็จ
      router.push('/login?registered=true')
    } catch (error) {
      if (error.message.includes('Unique constraint')) {
        setError('อีเมลหรือชื่อผู้ใช้นี้ถูกใช้งานแล้ว')
      } else {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex items-center justify-center p-4">
      <div 
        className="w-full max-w-[480px] bg-[#FFD369] rounded-[40px] p-6 shadow-[0_0_25px_rgba(255,211,105,0.25)]"
        data-aos="fade-up"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6" data-aos="zoom-in" data-aos-delay="200">
          <div className="w-[135px] h-[125px] relative rounded-full overflow-hidden mb-3">
            <Image
              src="https://img5.pic.in.th/file/secure-sv1/Gemini_Generated_Image_gr6sqmgr6sqmgr6s.jpg"
              alt="GameIDShop Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-[26px] text-[#eeeeee] font-kanit font-bold">GameIDShop</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" data-aos="fade-up" data-aos-delay="400">
          {/* Username */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
              placeholder="ชื่อผู้ใช้"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
              placeholder="อีเมล"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
                placeholder="รหัสผ่าน"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
                placeholder="ยืนยันรหัสผ่าน"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-[165px] h-[45px] bg-[#eeeeee] rounded-[20px] text-[#222831] font-kanit font-bold text-lg mx-auto block transition-all duration-300 hover:scale-105 mt-6 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e0e0e0]'
            }`}
            data-aos="fade-up" 
            data-aos-delay="600"
          >
            {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>

          {/* Login Link */}
          <div className="text-center font-kanit mt-3 text-sm" data-aos="fade-up" data-aos-delay="800">
            <span className="text-[#222831]">มีบัญชีอยู่แล้ว? </span>
            <a 
              href="/login" 
              className="text-[#222831] font-semibold hover:underline"
            >
              เข้าสู่ระบบ
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}