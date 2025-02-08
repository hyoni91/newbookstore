import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";




// category List 
export async function GET(request: Request) {
    try{
        const categories = await prisma.category.findMany({
            orderBy: {
                id: "desc",
            },
        });

        return NextResponse.json(categories, {status: 200});
    }catch(error){
        console.error("Not Found:", error);
        return NextResponse.json({ error: " Error " }, { status: 500 });
    }
}
