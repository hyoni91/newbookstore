"use client";

import { useUserContext } from "@/context/UserContext";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Item } from "@/types/item";
import { useEffect, useState } from "react";

interface ItemDetailProps {
    itemId: string;
}


export default function ItemDetail({ itemId }: ItemDetailProps) {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useUserContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isIntro,setIsIntro] = useState(true)
    const windowWidth = useWindowWidth();    

    console.log("ItemDetail:", item);


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/items/detail?id=${itemId}`,{
                    method:"GET",
                    headers:{
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                });
                console.log("Response status:", response.status);
                console.log("Response headers:", response.headers);
                
                if (!response.ok) throw new Error('Failed to fetch item');
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    if (loading) return <div>Loading...</div>;
    if (!item) return <div>Item not found</div>;

    const handleAddToCart = async () => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemId : parseInt(itemId, 10),
                    cnt: 1,
                    userId : userId
                })
            });

            console.log(item)

            if (!response.ok) throw new Error('Failed to add to cart');
            const data = await response.json();
            console.log('Cart updated:', data);


        } catch (error) {
            console.error('Error adding to cart:', error);

        }
    };

    return (
        <div className="px-5 py-5 max-w-6xl mx-auto p-4">
                <div className={`${windowWidth < 640? "flex flex-col gap-4  items-center" : "flex gap-10"} `}>
                    <div>
                        <img 
                        src={`/uploads/${item.itemImgs?.[0]?.attachedFileName}`}
                        alt={item.name}
                        className="w-40 sm:w-48 md:w-56 lg:w-72 border-[1px] h-auto object-cover rounded-lg"
                    />
                        <button className="mt-2 py-2 w-40 sm:w-48 md:w-56 lg:w-72 border-[1px] rounded-lg font-center hover:border-gray-300" onClick={()=>{alert("準備中です")}}>立ち読み</button>
                    </div>
                    <div className={` ${windowWidth <640? "flex w-full flex-col items-center "  : "flex w-full flex-col justify-center gap-4" } `}>
                        <div>
                            <p className="text-s">{item.category.name}</p>
                            <h1 className="text-2xl font-bold">{item.name}</h1>
                            <p className="text-m font-semibold mb-2">¥{item.price.toLocaleString()}</p>  
                        </div>
                       
                            {
                                windowWidth <640?
                                null
                                :
                                <>
                                    <div className="h-20">
                                        <p className="text-sm w-32">電子図書 : 本書は電子版のサービスはございません。</p>
                                        <p className="text-sm">中古 : 多数あり</p>
                                    </div>
                                    <div className={` w-full flex gap-2 mt-12  justify-start"`}>
                                        <button 
                                            className="w-sm text-m  text-black border-stone-400 border-[1px] py-2 px-4 rounded-lg hover:border-stone-600 transition-colors"
                                            onClick={handleAddToCart}
                                        >
                                            <i className="bi bi-cart" />
                                        </button>
                                        <button className="w-32 sm:w-40 md:w-48 lg:w-52   text-m bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">購入する</button>
                                    </div> 
                                </>
                            }
                            
                        
                        
                    </div>
                </div>
                  

                <div className="mt-16">
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-1xl  lg:text-1xl"> {item.name} </h1>
                        <h1 className="text-xl font-semibold mb-3">詳細内容</h1>
                    </div>
                    <div className="w-full border-t-2 border-gray-400">

                        <button className={`w-1/2 py-4   border-r-[1px] ${isIntro? "border-r-[1px]" : "border-b-[1px] bg-gray-100"}`} onClick={()=>{setIsIntro(true)}}>作品紹介</button>
                        <button className={`w-1/2 py-4 ${isIntro? " bg-gray-100 border-b-[1px]":" "}`} onClick={()=>{setIsIntro(false)}}>イントロ</button>
                        {
                            isIntro? 
                            <>
                            {item.itemImgs?.slice(1).map((img,id) => (
                                <div key={id} className={` relative transition-all duration-300 ${isExpanded ? "h-auto" : windowWidth < 847? "h-96 overflow-hidden" : "h-svh overflow-hidden"}`}>
                                     <img
                                    key={img.id}
                                    src={`/uploads/${img.attachedFileName}`}
                                    alt={item.name}
                                    className={` mt-10 h-auto object-cover rounded-lg ${windowWidth < 640 ? "w-full " : "w-2/3 "} `}
                                    />
                                    {!isExpanded &&  (
                                         <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent `}></div>
                                    )}
                                </div>
    
                            ))}
                                
                                {isExpanded ? <></> : 
                                <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`  py-2 mt-0 text-black-500  border-[1px] rounded ${windowWidth < 640 ? "w-full":" w-2/3 "}`}
                                >もっと</button>
                                }
                            </>

                            :
                            <div className="mt-10 mr-auto">
                                <p>出版社：ドリム</p>
                                <p>作家：ホシノアイ</p>
                                <p>発売日：2023/12/12</p>
                                <p className="mt-10 font-bold">内容について</p>
                                {item.intro}
                            </div>

                        }
                        
                    </div>
                    
                </div>
                 {/* Buttons for Mobile */}
            {windowWidth < 640 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white py-2 flex justify-end gap-2 items-center border-t">
                    <button 
                        className="w-1/4 h-12 text-m text-black border-stone-400 border-[1px] py-2 px-4 rounded-lg hover:border-stone-600 transition-colors"
                        onClick={handleAddToCart}
                    >
                        <i className="bi bi-cart" />
                    </button>
                    <button className="w-3/5 h-12 text-m bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        購入する
                    </button>
                </div>
            )}
        </div>
    );
}