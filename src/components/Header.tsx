"use client"

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";


export default function Header(){

const { userId, setUserId } = useUserContext();
const [isLoggedIn , setIsLoggedIn] = useState(false);
  
useEffect (()=>{
    const fetchUserProfile = async ()=>{
        const  token = window.localStorage.getItem("Token");
        if(token){
            setIsLoggedIn(true)
            const response = await fetch("/api/user/profile",{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
                },
            });

            if(response.ok){
                const userProfile = await response.json();
                setUserId(userProfile.user.id);
            }else{
                console.error("사용자 정보를 가져오는 데 실패했습니다." );


            }

        }
    };
    fetchUserProfile(); // 비동기 함수 호출
},[setUserId])



const handleLogout = () =>{
  window.localStorage.removeItem("Token");
  setIsLoggedIn(false);
} 

    return(
        <div>
        {
            isLoggedIn ? 
            <div className="flex ">
                 <p className="px-2 py-2 mt-1">{userId}様</p> 
                 <Link href="/mycart" className="px-2 py-2 text-xl"><i className="bi bi-cart4 " /></Link>
                 <button className="px-2 text-xl mt-1" onClick={handleLogout}><i className="bi bi-box-arrow-right" /></button>
            </div>
            :
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full font-medium">
              LOGIN
              </Link>
              <Link href="/join" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              JOIN
              </Link>
              </div>
          }
        </div>
    )
}

