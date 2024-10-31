import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        images: true,
        gameAccounts: {
          where: {
            isSold: false
          }
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}