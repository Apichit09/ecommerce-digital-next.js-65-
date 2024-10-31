'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function TopupSettingsPage() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState({
    qrImage: '',
    accountName: '',
    accountNumber: '',
    howToTopupImage: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // บันทึกการตั้งค่าลง database
    const response = await fetch('/api/admin/topup-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
    
    if (response.ok) {
      alert('บันทึกการตั้งค่าเรียบร้อย')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ฟอร์มสำหรับกรอกข้อมูลตั้งค่า */}
    </form>
  )
}