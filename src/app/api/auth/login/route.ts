import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export async function POST(request:Request) {
    try {
        const { id , password} = await request.json();

        //id존재 여부
        const user = await prisma.user.findUnique({ where : {id} });
        if(!user){
            return NextResponse.json({message : "User Not Found"} , {status : 404});
        }

        //비번 검증
        const isValidPw = await bcrypt.compare( password , user.password );
        if(!isValidPw){
            return NextResponse.json( {message : "Invalid credentials"} , { status : 401 } );
        }

        //JWT생성
        const token = jwt.sign(
            { userId: user.id }, // 페이로드
            process.env.JWT_SECRET as string, // secret key
            { expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string ,10) } // 만료 시간 (string)
        );

        // 토큰을 클라이언트에 반환
        return NextResponse.json({ message: "Login successful", token }, { status: 200 });

    } catch (error) {
        return NextResponse.json({message : "Error" , error} ,  {status :  500})
    }
}