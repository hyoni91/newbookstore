"use client"

import { POST } from "@/app/api/cart/route";
import { LoginFormData } from "@/types/user";
import React, { useState } from "react";

export default function LoginForm(){
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
            <div>
                <label htmlFor="id">ID</label>
                <input id="id" name="id" type="text" value={loginData.id} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">PASSWORD</label>
                <input id="password" name="password" type="password" value={loginData.password} onChange={handleChange}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}