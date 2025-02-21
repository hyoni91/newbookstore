import prisma from "@/lib/prisma";
import { ChangeCartCntRequest } from "@/types/item";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest) {
    try {
        const {itemId, userId, cnt} : ChangeCartCntRequest = request.body;
        console.log("Request body:", request.body);

        if(!id || !userId || !cnt){
            return NextResponse.json({message: "id, userId, cnt are required"} , {status : 400});
        }
        const updatedCart = await prisma.cart.updateMany({
            where : {
                userId,
                itemId : id,
            },
            data : {
                cnt : cnt
            }
        });
        return NextResponse.json(updatedCart, {status : 200});
    } catch (error) {
        console.error("Error changing cart cnt:", error);
        return NextResponse.json({message : "Error changing cart cnt" , error}, {status :  500})
    }
}