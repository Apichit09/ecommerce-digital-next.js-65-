import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: parseInt(params.id)
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

    // Format products for frontend
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: `${product.price} ฿`,
      image: product.images[0]?.url || ''
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}