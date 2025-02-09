import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


// item List 
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    console.log("🟡 API 호출됨! categoryId:", categoryId); 
    try{
        const items = await prisma.item.findMany({
            where: categoryId ? {
                status: "active",
                categoryId: parseInt(categoryId)
            } : {
                status: "active"
            },
            include: {
                itemImgs: true,
                category : true
            },
            orderBy: { 
                categoryId:"desc",
            },
        });
        console.log("🟢 불러온 데이터:", items);

        return NextResponse.json(items, {status: 200});
    }catch(error){
        console.error("Not Found:", error);
        return NextResponse.json({ error: " Error " }, { status: 500 });
    }

  
}
