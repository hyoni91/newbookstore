import ItemForm from "@/components/ItemForm";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ItemPage() {
    const categories = await prisma.category.findMany();
    
    return (
        <div>
            <h1>상품 등록</h1>
            <ItemForm initialCategories={categories}/>
            <Link href="/">목록으로</Link>
        </div>
    );
}   