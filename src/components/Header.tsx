"use client"

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Header(){


const [isLoggedIn , setIsLoggedIn] = useState(false);
const [userId, setUserId] = useState("")
  
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
                console.log(userProfile); 
            }else{
                console.error("사용자 정보를 가져오는 데 실패했습니다." );


            }

        }
    };
    fetchUserProfile(); // 비동기 함수 호출
},[])



const handleLogout = () =>{
  window.localStorage.removeItem("Token");
  setIsLoggedIn(false);
} 

    return(
        <div>
        {
            isLoggedIn ? 
            <div className="flex gap-4">
                 <p>{userId}様</p> {/* userId 출력 */}
                 <button onClick={handleLogout}>LOGOUT</button>
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

