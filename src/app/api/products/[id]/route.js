import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id, 10);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'รหัสสินค้าไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        images: true,      // ดึงข้อมูลรูปภาพ
        category: true,    // ดึงข้อมูลหมวดหมู่
        gameAccounts: {    // ดึงข้อมูลบัญชีเกมที่ยังไม่ถูกขาย
          where: {
            isSold: false
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'ไม่พบสินค้า' },
        { status: 404 }
      );
    }

    // แปลงข้อมูลให้เหมาะสมกับการแสดงผล
    const formattedProduct = {
      ...product,
      images: product.images.map(img => img.url), // แปลงเป็น array ของ URL
      gameAccountsCount: product.gameAccounts.length // จำนวนบัญชีที่ยังไม่ถูกขาย
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}