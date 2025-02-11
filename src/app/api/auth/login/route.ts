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
            return NextResponse.json( {message : "Invalid credentials"} , { status : 401 } ):
        }

        //JWT생성
        const token = jwt.sign(
            { userId: user.id }, //페이로드
            process.env.JWT_SECRET as string, //secret key
            { expiresIn: process.env.JWT_EXPIRES_IN } // 만료 시간
        );
        
    } catch (error) {
        
    }
}