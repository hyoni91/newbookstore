import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// item List 
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    console.log("categoryId:", categoryId);
    try{
        const items = await prisma.item.findMany({
            where: categoryId ? {
                status: "FOR_SALE",
                categoryId: parseInt(categoryId)
            } : {
                status: "FOR_SALE"
            },
            include: {
                itemImgs: true,
                category : true
            },
            orderBy: { 
                categoryId:"desc",
            },
        });
        console.log('Returned items:', items);  // 반환된 아이템 확인

        return NextResponse.json(items, {status: 200});
    }catch(error){
        console.error("Not Found:", error);
        return NextResponse.json({ error: " Error " }, { status: 500 });
    }

  
}
