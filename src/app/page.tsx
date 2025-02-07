import Image from "next/image";
import ItemList from "@/components/ItemList";
import prisma from "../../lib/prisma";


export default async function Home() {

  const items = await prisma.item.findMany();

  return (
    <div>
      <h1>Bookstore main</h1>
      <ItemList initialItems={items} />
    </div>
  );
}
