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
      <ItemList initialItems={items} initialCategories={categories} />
    </div>
  );
}
