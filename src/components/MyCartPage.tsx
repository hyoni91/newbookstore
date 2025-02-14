"use client"

import { useUserContext } from "@/context/UserContext";
import { MyCart } from "@/types/cart";
import React, { useEffect, useState } from "react";


export default function MyCartPage(){
    const {userId} = useUserContext();
    const [cartData, setCartData] = useState<MyCart[]>();

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
        <table>
            <thead>
                <tr>
                    <td>NO</td>
                    <td></td>
                    <td>タイトル</td>
                    <td>数量</td>
                    <td>価格</td>
                    <td>総額</td>
                    <td>DATE</td>
                </tr>
            </thead>
            <tbody>
            {
                cartData?.map((data,id)=>{
                    return(
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>
                                <img src={`/uploads/${data.mainImg}`}/>
                                <p>{data.itemName}</p>
                            </td>
                            <td>
                                <input type="number" name="cnt" defaultValue={data.cnt}/>
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
    )
}