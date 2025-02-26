import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//item search
export async function GET(request: Request) {
    const { searchParams} = new URL(request.url);
    const name = searchParams.get("name");

    console.log("name:", name);
    try {
        const items = await prisma.item.findMany({
            where: name ? {
                name : {
                    contains : name
                }
            } : {
                status: "FOR_SALE"
            },
            include: {
                itemImgs: true,
                category: true,
            },
            orderBy: {
                categoryId: "desc",
            },
        });
        console.log('Returned items:', items); // 반환된 아이템 확인

        return NextResponse.json(items, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: " Error " }, { status: 500 });
        console.error("Not Found:", error);
         
    }

}