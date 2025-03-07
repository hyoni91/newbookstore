"use client"

import { useUserContext } from "@/context/UserContext";
import { MyCart } from "@/types/cart";
import { ChangeCartCntRequest } from "@/types/item";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";


export default function MyCartPage(){
    const {userId} = useUserContext();
    const [cartData, setCartData] = useState<MyCart[]>();
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<number[]>([]);
    const [cntChangeData, setCntChangeData] = useState<ChangeCartCntRequest|undefined>();

    console.log("UserId:", userId);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked, value} = e.target;
        
        if(checked){
            setDeleteId(prev => [...prev, Number(value)]);

        }else{
            setDeleteId(prev => prev.filter(id => id !== Number(value)));
        }
    
    }

    const handleDelete = async () => {
        if (deleteId.length === 0) {
            alert("削除するアイテムを選択してください。");
            return;
        }
        try {
            const response = await fetch('/api/cart/mycart/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id : deleteId,
                    userId : userId
                })
            });
            if (!response.ok) throw new Error('Failed to delete cart');
            const data = await response.json();
            console.log('Cart deleted:', data);
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    }

    useEffect(()=>{
        if(!userId){
            return;
          }
        const fetchCart = async () => {

        try {
                const response = await fetch(`/api/cart/mycart/${userId}`,{
                    method:"GET",
                    headers:{
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                });
                const text = await response.text();
                console.log("Response Text:", text);  // 텍스트로 응답 확인
                
                if(!response.ok)throw new Error("Failed to fetch cart");
                const data = JSON.parse(text);  // 직접 파싱
                setCartData(data);
            }
            
         catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
        fetchCart();
    },[userId, cntChangeData])

    const onChangeCntData = (e: React.ChangeEvent<HTMLInputElement> , id : number) => {
        const {name,value} = e.target;
        setCntChangeData(prev => {
            const newValue = name === "cnt" ? Number(value) : value;  // cnt일 때만 수치로 변환

            return {
                ...prev,
                id : id,
                [name]: newValue
            } as ChangeCartCntRequest;
        });
    }

    console.log("cntChangeData:", cntChangeData);


    //changeCartCnt
    const handleChangeCnt = async () => {
        if(!cntChangeData){
            alert("数量を選択してください。");
            return;
        }

        try {
            const response = await fetch(`/api/cart/mycart/${userId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    id : cntChangeData?.id,
                    cnt : cntChangeData?.cnt
            })
        });
        if(!response.ok) throw new Error("Failed to change cart cnt");
        alert("数量が変更されました。");
            
        } catch (error) {
            console.error("Error changing cart cnt:", error);
            
        }
    }



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
                                <input type="checkbox" value={data.itemId}  onChange={handleCheck}/>
                            </td>
                            <td onClick={()=>{router.push(`/itemdetail/${data.itemId}`)}} className="flex flex-col items-center justify-center cursor-pointer">
                                <img className={`w-20 sm:w-20 md:w-24 lg:w-32 mb-2 border-[1px] rounded-md`} src={`/uploads/${data.mainImg}`}/>
                                <span >{data.itemName}</span>
                            </td>
                            <td>
                                <input 
                                    className="w-14 border-[1px] rounded-lg p-2 text-center" 
                                    type="number" name="cnt" 
                                    defaultValue={data.cnt} 
                                    onChange={(e)=>{onChangeCntData(e,data.id)}}
                                />
                                <p>
                                    <button 
                                        type="button" 
                                        className="text-sm rounded-lg border-[1px] bg-blue-500 text-white mt-2 py-1 px-2 hover:bg-blue-600"
                                        onClick={()=>{handleChangeCnt()}}
                                    >
                                            変更
                                    </button>
                                </p>
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
                <button 
                    className="w-2/12 text-gray-600 border-[1px] hover:text-gray-900 hover:border-gray-400 p-4 rounded-full font-medium"
                    onClick={()=>{handleDelete()}}
                >
                        削除する
                </button>
                <button className="w-2/12 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors">購入する</button>
             </div>
            
        </div>
        
    )
}