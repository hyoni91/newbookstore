"use client";

import { useUserContext } from "@/context/UserContext";
import { Item } from "@/types/item";
import { useEffect, useState } from "react";

interface ItemDetailProps {
    itemId: string;
}


export default function ItemDetail({ itemId }: ItemDetailProps) {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useUserContext();
    


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/items/detail?id=${itemId}`);
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
        <div className="px-10 py-10 max-w-6xl mx-auto p-4">
                <div className="flex gap-10 ">
                    <div>
                        <img 
                        src={`/uploads/${item.itemImgs?.[0]?.attachedFileName}`}
                        alt={item.name}
                        className="border-[1px] h-auto object-cover rounded-lg"
                    />
                    </div>
                    <div className=" flex w-full flex-col justify-center">
                        <p className="text-xs">{item.category.name}</p>
                        <h1 className="text-xl font-bold">{item.name}</h1>
                        <p className="text-m font-semibold">¥{item.price.toLocaleString()}</p>
                    </div>
                    
                </div>
                <div className="mt-10 w-full flex gap-2 justify-start">
                    <button 
                        className="w-sm text-m  text-black border-stone-400 border-[1px] py-2 px-4 rounded-lg hover:border-stone-600 transition-colors"
                        onClick={handleAddToCart}
                    >
                        <i className="bi bi-cart" />
                    </button>
                    <button className="w-2/12 text-m bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-grey-600 transition-colors">購入する</button>
                 </div>   

                <div className="mt-12">
                    <div>
                        <h1 className="text-xl"> {item.name} </h1>
                        <h1 className="text-xl font-bold mb-3">情報</h1>
                    </div>
                    <div className="w-full border-t-2 border-gray-400">
                        <button className="w-1/2 py-4   border-r-[1px]">作品紹介</button>
                        <button className="w-1/2 py-4 bg-gray-100 border-b-[1px]">イントロ</button>
                        {item.itemImgs?.slice(1).map((img) => (
                            <div className="">
                                 <img
                                key={img.id}
                                src={`/uploads/${img.attachedFileName}`}
                                alt={item.name}
                                className=" w-2/3 mt-10 h-auto object-cover rounded-lg"
                                />
                            </div>
                           
                        ))}
                    </div>
                    
                </div>
        </div>
    );
}