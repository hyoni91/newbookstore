"use client"

import { LoginFormData } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm(){
    const router = useRouter();

    const [loginData, setLoginData] = useState<LoginFormData>({
        id : '',
        password: ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const { name,value} = e.target;
        setLoginData(prev =>({
            ...prev,
            [name] : value
        }));
    }


    const handleSubmitLogin = async (e:React.FormEvent) =>{ 
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/login",{
                method : "POST",
                headers : { "Content-Type" : "application.json" },
                body : JSON.stringify({id : loginData.id, password : loginData.password}),
            });
           
            const data = await response.json();

            if(response.ok){
                localStorage.setItem("Token", data.token); //JWT저장
                router.push("/")
            }else{
                console.error(data.message)
            }
            
        } catch (error) {
            console.error("Error during registration" , error)
            alert("error")            
        }
       

}

    return(
        <form onSubmit={handleSubmitLogin}>
            <div className="mt-3">
                <input className="border border-gray-300 rounded-md p-2 w-full" id="id" name="id" type="text" placeholder="ID" value={loginData.id} onChange={handleChange}/>
            </div>
            <div className="mt-3 mb-10">
                <input className="border border-gray-300 rounded-md p-2 w-full" id="password" name="password" type="password" placeholder="PASSWORD" value={loginData.password} onChange={handleChange}/>
            </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full" type="submit">ログイン</button>
        </form>
    )
}