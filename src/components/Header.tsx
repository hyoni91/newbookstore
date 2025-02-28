"use client"

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Item as PrismaItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { on } from "events";

interface Item extends PrismaItem {
  itemImgs?: { attachedFileName: string }[];
}

export default function Header(){

const { userId, setUserId } = useUserContext();
const [isLoggedIn , setIsLoggedIn] = useState(false);
const windowWidth = useWindowWidth();
const [name, setName] = useState<string>("");
const [items, setItems] = useState<Item[]>([]);
const [isSearch, setIsSearch] = useState(false);
const router = useRouter();

 // 검색어가 바뀔 때마다 자동으로 검색이 실행되도록 설정
 useEffect(() => {
    if (name.trim() !== "") {
        searchItem();
    }
    if(name === ""){
        setIsSearch(false);
    }

}, [name]);

const searchItem = async () => {
    if(name === ""){
        return;
    }

    const response = await fetch(`/api/items/search?name=${name}`);
    const data: Item[] = await response.json();
    setItems(data || []);
    setIsSearch(!isSearch);
}

//Click Enter key
// const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { 
//     if (e.key === "Enter") {
//         searchItem();
//     }
// };

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
            windowWidth < 768 ?
            <div>
                <i className="bi bi-list" />
            </div>
            :
        <div className="flex items-center space-x-6">
            <div className="relative">
                <input 
                  placeholder="本を探す" 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    // onKeyPress={handleKeyPress} click enter key
                  className="max-w-64  px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg 
                    className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 cursor-pointer" 
                    fill="none" stroke="currentColor" 
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>{searchItem(); setIsSearch(!isSearch)}} >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
        {
            isLoggedIn ? 
            <div className="flex ">
                 <p className="px-2 py-2 mt-1">{userId}様</p> 
                 <Link href="mycart" className="px-2 py-2 text-xl"><i className="bi bi-cart4 " /></Link>
                 <button className="px-2 text-xl mt-1" onClick={handleLogout}><i className="bi bi-box-arrow-right" /></button>
            </div>
            :
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full font-medium">
              LOGIN
              </Link>
              <Link href="join" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              JOIN
              </Link>
              </div>
          }
        </div>
    }
    {
        isSearch?
        <div className="z-500 w-60 p-5 bg-white absolute top-14 border-[1px]">
                <p>
                    {
                        items.length === 0 ?
                        <p className="text-sm">検索結果がありません</p>
                        :
                        <p className="text-sm">検索結果</p>
                    }
                    {

                        items.map((item,id)=>{
                            return(
                                <div 
                                    className="mt-2 flex justify-start items-center gap-2 cursor-pointer" 
                                    key={id}
                                    onClick={()=>{router.push(`/itemdetail/${item.id}`); setIsSearch(false)}}
                                >
                                    <img 
                                        className="w-20 border-[1px] rounded-md" 
                                        src={`/uploads/${item.itemImgs?.[0].attachedFileName}`}
                                         alt="main img"
                                    />
                                    <div >
                                        <p className="text-sm">{item.name}</p>
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                    


                </p>
            </div>
            :
            null

    }
            
        
        </div>
    )
}

