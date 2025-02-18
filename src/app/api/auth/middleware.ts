
//JWT가 유효한지 검증하는 미들웨어
import { NextRequest } from "next/server";
import  jwt, { JwtPayload }  from "jsonwebtoken";

export function verifyToken(request:NextRequest):JwtPayload | null{
    const authHeader = request.headers.get("Authorization");
 
    if(!authHeader){
        return null;
    }

    const token = authHeader.split(" ")[1]; //"Bearer <TOKEN>"
    if (!token) {
        console.log("Token is missing");
        return null; // 토큰이 없으면 null 반환
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload ; //검증 후 사용자 정보 반환
        return decoded; // 페이로드 반환 (userId 등 포함)

        
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null
    }
    

}