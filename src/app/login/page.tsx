"use client"

import LoginForm from "@/components/LoginForm";
import React from "react";


export default function LoginPage(){

    return(
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl text-center font-bold mb-6 mt-10">LOGIN</h1>
            <LoginForm/>
        </div>
    )
}