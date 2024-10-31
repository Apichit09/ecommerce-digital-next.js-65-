import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Email หรือ Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.login || !credentials?.password) {
            throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน')
          }

          // ค้นหาผู้ใช้จาก email หรือ username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.login.toLowerCase() },
                { username: credentials.login.toLowerCase() }
              ]
            }
          })

          if (!user) {
            console.log('ไม่พบผู้ใช้:', credentials.login)
            throw new Error('ไม่พบบัญชีผู้ใช้')
          }


          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log('ผลการตรวจสอบรหัสผ่าน:', isPasswordValid)

          if (!isPasswordValid) {
            throw new Error('รหัสผ่านไม่ถูกต้อง')
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            image: user.image,
            role: user.role,
            balance: user.balance
          }
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการตรวจสอบ:', error)
          throw error
        } finally {
          await prisma.$disconnect()
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.balance = user.balance
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.balance = token.balance
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development', // เพิ่ม debug mode
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }