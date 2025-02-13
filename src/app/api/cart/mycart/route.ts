
import prisma from "@/lib/prisma";
import { MyCart } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

//myCartPage

export async function GET(request:NextRequest , {params} : {params : {id:string}}) {
    try {
        const userId = params.id;

        if(!userId){
            return NextResponse.json({message: "UserId is required"} , {status : 400});
        }

        const cartItems = await prisma.cart.findMany({
            where : {
                userId
            },include : {
                item : {
                    include :{
                        itemImgs : true
                    }
                }
            },
        });

        return NextResponse.json(cartItems, {status : 200})
        
    } catch (error) {
        console.error("Error fetching cart:" , error);
        return NextResponse.json({message : "Error fetching cart" , error}, {status :  500})
    }
    
}