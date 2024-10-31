import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const websiteInfo = await prisma.websiteInfo.findFirst();
    
    if (!websiteInfo) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลเว็บไซต์' },
        { status: 404 }
      );
    }

    return NextResponse.json(websiteInfo);
  } catch (error) {
    console.error('Error fetching website info:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลเว็บไซต์' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}