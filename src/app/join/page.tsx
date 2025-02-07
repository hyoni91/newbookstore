import React, { useState} from "react";
import { JoinFormData } from "@/types/auth";
import { stringify } from "querystring";


export default function JoinPage(){
    const [joinData, setJoinData] = useState<JoinFormData>({
        id: '',
        password: '',
        username: '',
        email: '',
        phone: '',
        addr: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name , value} = e.target;
        setJoinData((prevData => ({...prevData, [name]: value} as JoinFormData)));

    }

    const handleSubmit = async ( e: React.FormEvent) =>{
        e.preventDefault();
        const response = await fetch("api/auth/join",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(joinData)
        });

        const data = await response.json();
        if(response.ok){
            alert("OK")
        }else{
            alert(data.message || "가입 실패")
        }

        return(
            <div>
                
            </div>
        )

    }


}