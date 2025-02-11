import prisma from "@/lib/prisma";
import { AddCart } from "@/types/cart";
import { NextResponse } from "next/server";

//add cart
export async function POST(request:Request) {
    
    try {
        const { cnt , itemId , userId } : AddCart   = await request.json();

         //이미 해당 아이템이 있는지 확인
         const existingCartItem = await prisma.cart.findFirst({
            where : {
                itemId,
                userId,
            },
         });

         let cart;
         
         //있으면 업데이트, 없으면 인설트
      if (existingCartItem) {
        cart = await prisma.cart.update({
          where: { id: existingCartItem.id }, // 기존 장바구니 항목의 ID로 업데이트
          data: { cnt: existingCartItem.cnt + cnt }, // 기존 수량에 추가
        });
      } else { 
         cart = await prisma.cart.create({
            data : {
                cnt,
                itemId,
                userId
            }
        });

        return NextResponse.json({message : "Add Cart" , cart} ,{status : 200})
      }
    }
      catch (error) {
        console.error("error! : ", error);
        return NextResponse.json(
            { message : "error" , error},
            {status : 500}
        );
    }
}   
