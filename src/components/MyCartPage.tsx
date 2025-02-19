"use client"

import { useUserContext } from "@/context/UserContext";
import { MyCart } from "@/types/cart";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";


export default function MyCartPage(){
    const {userId} = useUserContext();
    const [cartData, setCartData] = useState<MyCart[]>();
    const router = useRouter();

    useEffect(()=>{
        if(!userId){
            return;
          }
        const fetchCart = async () => {

        try {
                const response = await fetch(`/api/cart/mycart/${userId}`);
                if(!response.ok)throw new Error("Failed to fetch cart");
                const data = await response.json();
                setCartData(data);
            }
            
         catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
        fetchCart();
    },[userId])

    console.log(cartData)


    return(
        <div className="w-full px-10 py-10 mx-auto">
            <div className="text-sm text-left mb-10">カートに追加された商品の一覧です。</div>
            <table className="w-full mr-auto  border-collapse border-t-[1px] border-b-[1px] text-center ">
            <colgroup>
            <col style={{width:"5%"}}/>
            <col style={{width:"3%"}}/>
            <col style={{width:"*"}}/>
            <col style={{width:"5%"}}/>
            <col style={{width:"10%"}}/>
            <col style={{width:"10%"}}/>
            <col style={{width:"30%"}}/>
            </colgroup>
            <thead className="[&>tr>td]:p-4">
                <tr className="border-b-2 p-4 border-double">
                    <td>NO</td>
                    <td></td>
                    <td>タイトル</td>
                    <td>数量</td>
                    <td>価格</td>
                    <td>総額</td>
                    <td>DATE</td>
                </tr>
            </thead>
            <tbody className="[&>tr>td]:p-4">
            {
                cartData?.map((data,id)=>{
                    return(
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td onClick={()=>{router.push(`/itemdetail/${data.itemId}`)}} className="flex flex-col items-center justify-center cursor-pointer">
                                <img className={`w-20 sm:w-20 md:w-24 lg:w-32 mb-2 border-[1px] rounded-md`} src={`/uploads/${data.mainImg}`}/>
                                <span >{data.itemName}</span>
                            </td>
                            <td>
                                <input className="w-12 border-[1px] rounded-lg p-2 text-center" type="number" name="cnt" defaultValue={data.cnt}/>
                            </td>
                            <td>
                                ¥{(data.price).toLocaleString()}
                            </td>
                            <td>
                                ¥{(data.cnt * data.price).toLocaleString()}
                            </td>
                            <td>
                                {data.date}
                            </td>

                        </tr>
                    )
                })
            }
            </tbody>

             </table>
             <div className="mt-10 text-right">
                総額 : <span className="font-semibold">¥{cartData? cartData.reduce((acc,cur)=> acc + cur.cnt*cur.price,0).toLocaleString() : 0}</span>
             </div>
             <div className="mt-10 flex justify-end gap-4">
                <button className="w-2/12 text-gray-600 border-[1px] hover:text-gray-900 hover:border-gray-400 p-4 rounded-full font-medium ">削除する</button>
                <button className="w-2/12 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors">購入する</button>
             </div>
            
        </div>
        
    )
}