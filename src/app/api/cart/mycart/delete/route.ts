import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { DeleteItemRequest } from "@/types/item";


export async function DELETE(request:NextRequest) {
    


    try {
        const { id }: DeleteItemRequest = await request.json();
    
        console.log("DeleteItemRequest:", { id });
        if (!id || !Array.isArray(id)) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }

        const deleteItem = await prisma.item.deleteMany({
            where: {
                id: {
                    in: id
                }
            }
        });

        return NextResponse.json({ message: `${deleteItem.count} items deleted successfully` }, { status: 200 });


    } catch (error) {
        return NextResponse.json({message : "Error deleting cart" , error}, {status :  500})

    }


}