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
                    itemId : parseInt(itemId),
                    cnt: 1,
                    userId : userId
                })
            });

            if (!response.ok) throw new Error('Failed to add to cart');
            const data = await response.json();
            console.log('Cart updated:', data);

        } catch (error) {
            console.error('Error adding to cart:', error);

        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <img 
                        src={`/uploads/${item.itemImgs?.[0]?.attachedFileName}`}
                        alt={item.name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {item.itemImgs?.slice(1).map((img) => (
                            <img
                                key={img.id}
                                src={`/uploads/${img.attachedFileName}`}
                                alt={item.name}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p>{item.category.name}</p>
                        {/* <p>在庫: {item.stock}点</p> */}
                    </div>
                    <h1 className="text-3xl font-bold">{item.name}</h1>
                    <p className="text-xl font-semibold">¥{item.price.toLocaleString()}</p>
                    <p className="text-gray-600">{item.intro}</p>
                    
                    <button 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleAddToCart}
                    >
                        カートに入れる
                    </button>
                </div>
            </div>
        </div>
    );
}