import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//item detail 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    try {
        const item = await prisma.item.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                itemImgs: true,
                category: true
            }
        });

        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error("Error fetching item details:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
