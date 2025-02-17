import { NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){

    try {
        const popularBooks = await prisma.cart.groupBy({
            by : ["itemId"],
            _sum : {cnt : true},
            orderBy : {_sum: {cnt : "desc"}},
            take : 9
        });

        if (!popularBooks || popularBooks.length === 0) {
            return NextResponse.json({ message: "No popular books found" }, { status: 404 });
        }

        //itemId추출
        const itemIds = popularBooks.map((book)=>book.itemId);
        //item정보
        const books = await prisma.item.findMany({
            where : {id : {in : itemIds }},
            include : {
                itemImgs: true,
                category : true
            }
        });

        const orderedBooks = itemIds.map((id) => books.find((book) => book.id === id)).filter(Boolean);

        return NextResponse.json(orderedBooks, {status : 200})
        
    } catch (error) {
        console.error("Error fetching popular books:", error);
        return NextResponse.json({message : "Error fetching popular books"}, {status : 500})
        
    }

}