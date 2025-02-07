import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { JoinRequest } from "@/types/auth"; 
import prisma from "../../../../lib/prisma";


export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse
){
    if(req.method === 'POST'){
        const { id, password, username, email, phone, addr, role }: JoinRequest = req.body;

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10); // 10은 salt rounds 값

        try{
            const user = await prisma.user.create({
                data:{
                    id,
                    password:hashedPassword,
                    username,
                    email,
                    phone,
                    addr,
                    role : role || "USER",
                },
            });
            res.status(201).json({ message: "User created", user });

        } catch(error){
            res.status(500).json({message :  "Error creating user", error})
        }
    }else[
        res.status(405).json({ message : "Method Not Allowed"})
    ]
}