import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // ถ้าไม่มีข้อมูล banner ให้ส่งค่าเริ่มต้นกลับไป
    if (banners.length === 0) {
      return NextResponse.json([
        {
          id: 1,
          imageLink: 'https://img2.pic.in.th/pic/60617ae39d592142f.png'
        },
        {
          id: 2,
          imageLink: 'https://img2.pic.in.th/pic/7d6cdcdace8b93143.png'
        },
        {
          id: 3,
          imageLink: 'https://img5.pic.in.th/file/secure-sv1/83fae2280d1997a47.png'
        }
      ]);
    }

    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// สำหรับเพิ่ม banner ใหม่ (ถ้าต้องการ)
export async function POST(request) {
  try {
    const data = await request.json();
    const banner = await prisma.banner.create({
      data: {
        imageLink: data.imageLink
      }
    });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}