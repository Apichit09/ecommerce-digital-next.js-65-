import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contactInfo.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    // ถ้าไม่มีข้อมูลใน database ให้ส่งค่าเริ่มต้น
    if (contacts.length === 0) {
      return NextResponse.json([
        {
          id: 1,
          platform: 'Facebook',
          url: 'https://facebook.com/gameidshop',
          icon: 'FaFacebook'
        },
        {
          id: 2,
          platform: 'Line',
          url: 'https://line.me/ti/p/~gameidshop',
          icon: 'FaLine'
        },
        {
          id: 3,
          platform: 'Instagram',
          url: 'https://instagram.com/gameidshop',
          icon: 'FaInstagram'
        },
        {
          id: 4,
          platform: 'Discord',
          url: 'https://discord.gg/gameidshop',
          icon: 'FaDiscord'
        }
      ]);
    }

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// สำหรับเพิ่มหรืออัพเดทข้อมูลติดต่อ
export async function POST(request) {
  try {
    const data = await request.json();
    
    // สร้างหรืออัพเดทข้อมูลติดต่อ
    const contact = await prisma.contactInfo.create({
      data: {
        platform: data.platform,
        url: data.url
      }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact info:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}