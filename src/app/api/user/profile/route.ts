
//JWT를 검증하여 인증된 사용자만 데이터를 가져올 수 있도록 설정
import { NextRequest, NextResponse, userAgent } from "next/server";
import { verifyToken } from "../../auth/middleware";
import prisma from "@/lib/prisma";
// import { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
    
    //jwt검증
    const user = verifyToken(request); 


    if(!user || typeof user === "string" || !user.userId){
        return NextResponse.json({message : "Unauthorized"} , { status : 401});
    }


    //사용자 정보 가져오기
    const userProfile = await prisma.user.findUnique({
        where : {id : user.userId},
        select : { id: true, email: true },
    });



    if(!userProfile){
        return NextResponse.json({message : "User Not Found"} , {status : 404})
    }

    return NextResponse.json({user : userProfile} , {status : 200});
}