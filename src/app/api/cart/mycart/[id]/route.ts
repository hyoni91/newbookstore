
import prisma from "@/lib/prisma";
import { MyCart } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";
//myCartPage

export async function GET(request:NextRequest , context: {params: {id: string}}) {
    
    try {
        const userId = context.params.id;

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
        
       // MyCart 인터페이스에 맞게 데이터 변환
       const formattedCart: MyCart[] = cartItems.map(cartItem => ({
        mainImg: cartItem.item.itemImgs[0]?.attachedFileName,
        itemName: cartItem.item.name,
        cnt: cartItem.cnt,
        price: cartItem.item.price,
        allPrice: cartItem.cnt * cartItem.item.price, // 총 가격 계산
        date: cartItem.date.toISOString().split("T")[0], // YYYY-MM-DD 형식 변환
    })); 

        return NextResponse.json(formattedCart, {status : 200});
        
    } catch (error) {
        console.error("Error fetching cart:" , error);
        return NextResponse.json({message : "Error fetching cart" , error}, {status :  500})
    }
    
}