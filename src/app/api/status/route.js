import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงข้อมูลจำนวนผู้ใช้
    const userCount = await prisma.user.count();

    // ดึงข้อมูลสินค้าที่พร้อมขาย (ยังไม่ถูกขาย)
    const availableProducts = await prisma.gameAccount.count({
      where: {
        isSold: false
      }
    });

    // ดึงข้อมูลสินค้าที่ขายแล้ว
    const soldProducts = await prisma.gameAccount.count({
      where: {
        isSold: true
      }
    });

    // ดึงข้อมูลจำนวนหมวดหมู่
    const categoryCount = await prisma.category.count();

    return NextResponse.json({
      userCount,
      availableProducts,
      soldProducts,
      categoryCount
    });
  } catch (error) {
    console.error('Error fetching status data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}