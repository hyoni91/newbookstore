
import prisma from "@/lib/prisma";
import { MyCart } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";
//myCartPage

export async function GET(request:NextRequest) {
    
    try {
        const paths = request.nextUrl.pathname.split("/");
        const userId = paths[paths.length - 1]; // 'test3'을 가져옴
        console.log("Extracted userId:", userId);

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
        id : cartItem.id,
        mainImg: cartItem.item.itemImgs[0]?.attachedFileName,
        itemName: cartItem.item.name,
        itemId: cartItem.itemId,
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


export async function PUT(request:NextRequest){

    try {
        const paths = request.nextUrl.pathname.split("/");
        const userId = paths[paths.length - 1]; // 'test3'을 가져옴
        console.log("Extracted userId:", userId);

        if(!userId){
            return NextResponse.json({message: "UserId is required"} , {status : 400});
        }

        const body = await request.json();
        console.log("ChangeCartCntRequest:", body);
        
        const changCnt = await prisma.cart.update({
            where: {
                id: body.id,
                },
            data : {
                cnt : body.cnt
            }
        });

        return NextResponse.json(changCnt, {status : 200});
        
    } catch (error) {
        return NextResponse.json({message : "Error changing cart cnt" , error}, {status : 500});
        
    }
}