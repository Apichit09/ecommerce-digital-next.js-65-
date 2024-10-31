import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { username, email, password } = await request.json()

    // ตรวจสอบว่ามีผู้ใช้นี้อยู่แล้วหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลหรือชื่อผู้ใช้นี้ถูกใช้งานแล้ว' },
        { status: 400 }
      )
    }

    // เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // สร้างผู้ใช้ใหม่
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'USER',
        balance: 0
      }
    })

    // ส่งข้อมูลกลับโดยไม่มีรหัสผ่าน
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'การลงทะเบียนล้มเหลว' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}