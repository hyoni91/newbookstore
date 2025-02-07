import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
    try{
        const items = await prisma.item.findMany({
            include: {
                itemImgs: true,
            },
            orderBy: { 
                id:"desc",
            },
        });

        return NextResponse.json(items, {status: 200});
    }catch(error){
        console.error("Not Found:", error);
        return NextResponse.json({ error: " Error " }, { status: 500 });
    }

  
}