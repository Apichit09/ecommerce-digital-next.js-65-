"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        login: formData.login,
        password: formData.password,
        redirect: false,
      })

      if (result.error) {
        setError('ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex items-center justify-center p-4">
      <div 
        className="w-full max-w-[480px] bg-[#FFD369] rounded-[40px] p-6 shadow-[0_0_25px_rgba(255,211,105,0.25)]"
        data-aos="fade-up"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username/Email */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              ชื่อผู้ใช้หรืออีเมล
            </label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="w-full h-[45px] rounded-[20px] px-5 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD369] focus:border-transparent font-kanit text-base"
              placeholder="ชื่อผู้ใช้หรืออีเมล"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[16px] text-[#222831] font-kanit font-semibold mb-2">
              รหัสผ่าน
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#FFD369] focus:ring-[#FFD369]"
              />
              <label htmlFor="remember" className="ml-2 text-[#222831] font-kanit font-medium text-sm">
                จดจำฉัน
              </label>
            </div>
            <a 
              href="/forgot-password" 
              className="text-[#222831] font-kanit font-medium text-sm hover:underline"
            >
              ลืมรหัสผ่าน?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-[165px] h-[45px] bg-[#eeeeee] rounded-[20px] text-[#222831] font-kanit font-bold text-lg mx-auto block transition-all duration-300 hover:scale-105 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e0e0e0]'
            }`}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          {/* Register Link */}
          <div className="text-center font-kanit text-sm">
            <span className="text-[#222831]">ยังไม่มีบัญชี? </span>
            <a 
              href="/register" 
              className="text-[#222831] font-semibold hover:underline"
            >
              สมัครสมาชิก
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}