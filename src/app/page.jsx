import { PrismaClient } from '@prisma/client'
import Navbar from './components/Navbar/page'
import BannerSlider from './components/BannerSlider/page'
import StatusCard from './components/StatusCard/page'
import RecommendedProduct from './components/RecommendedProduct/page'
import ProductCard from './components/ProductCard/page'
import Footer from './components/Footer/page'

const prisma = new PrismaClient()

async function getWebsiteInfo() {
  return await prisma.websiteInfo.findFirst()
}

async function getBanners() {
  return await prisma.banner.findMany()
}

async function getStatusCards() {
  return await prisma.statusCard.findMany()
}

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      products: {
        include: {
          images: true
        }
      }
    }
  })
}

async function getRecommendedProducts() {
  return await prisma.product.findMany({
    include: {
      images: true,
      category: true,
      gameAccounts: {
        where: {
          isSold: false
        }
      }
    },
    take: 6
  })
}

export default async function Home() {
  const websiteInfo = await getWebsiteInfo()
  const banners = await getBanners()
  const statusCards = await getStatusCards()
  const categories = await getCategories()
  const products = await getRecommendedProducts()

  const formattedProducts = products.map(product => ({
    id: product.id,
    image: product.images[0]?.url || '',
    name: product.name,
    description: product.description,
    price: `${product.price} ฿`
  }))

  return (
    <main className="min-h-screen bg-[#393E46]">
      <Navbar 
        siteName={websiteInfo?.name}
        logoPath={websiteInfo?.logoUrl}
        bannerPath={websiteInfo?.navbarImage}
      />

      <div className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
        <div className="mb-8">
          <BannerSlider banners={banners} />
        </div>

        <div className="mb-10">
          <StatusCard cards={statusCards} />
        </div>

        <div className="mb-10">
          <h2 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit max-w-[1090px] mx-auto px-4 lg:px-0">
            หมวดหมู่แนะนำ
          </h2>
          <RecommendedProduct categories={categories} />
        </div>

        <div className="mb-16">
          <div className="max-w-[1090px] mx-auto px-4 lg:px-0">
            <h2 className="text-[24px] text-[#eeeeee] font-bold mb-6 font-kanit">
              สินค้าแนะนำ
            </h2>
          </div>
          <ProductCard products={formattedProducts} />
        </div>
      </div>

      <Footer />
    </main>
  )
}