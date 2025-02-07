import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import type { JoinRequest } from "@/types/auth";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, password, username, email, phone, addr, role }: JoinRequest =
      await request.json();

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); // 10은 salt rounds 값

    // Prisma를 사용하여 새 사용자 생성
    const user = await prisma.user.create({
      data: {
        id,
        password: hashedPassword,
        username,
        email,
        phone,
        addr,
        role: role || "USER",
      },
    });

    return NextResponse.json({ message: "회원가입 완료", user }, { status: 201 });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json(
      { message: "회원가입 처리 중 오류 발생", error },
      { status: 500 }
    );
  }
}
