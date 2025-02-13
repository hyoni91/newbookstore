import ItemList from "@/components/ItemList";
import prisma from "../lib/prisma";
import ItemDetail from "@/components/ItemDetail";
import { useRouter } from "next/router";

export default async function Home() {
  
  const items = await prisma.item.findMany({
    include: {
      category: true,
      itemImgs: true
    }
  });
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="relative w-full ">
            <img 
              className="w-full h-[280px] object-cover object-center" 
              src="/images/book_banner.jpg" 
              alt="book_banner"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-white font-bold text-5xl mb-4">Enjoy a book</h1>
              <p className="text-white text-xl">最高の本をお届けします。</p>
            </div>
          </div>
      <ItemList initialItems={items} initialCategories={categories} />
    </div>
  );
}
