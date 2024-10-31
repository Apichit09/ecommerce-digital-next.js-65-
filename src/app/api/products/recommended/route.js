import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงสินค้าที่มีบัญชีเกมที่ยังไม่ถูกขาย
    const products = await prisma.product.findMany({
      take: 3,
      where: {
        gameAccounts: {
          some: {
            isSold: false
          }
        }
      },
      include: {
        images: true,
        category: true,
        gameAccounts: {
          where: {
            isSold: false
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // แปลงข้อมูลให้เหมาะสมกับการแสดงผล
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images[0]?.url || null, // ใช้รูปแรก
      category: product.category.name,
      availableAccounts: product.gameAccounts.length
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าแนะนำ' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}