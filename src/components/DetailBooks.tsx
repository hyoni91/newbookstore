"use client"


import { useEffect, useState } from "react";
import { Swiper , SwiperSlide } from 'swiper/react';import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { Item } from "@/types/item";
import { useRecentItems } from "@/hooks/useRecentItems";


export default function DetailBooks({categoryId , itemName}: {categoryId: number, itemName: string}) {
    const [items, setItems] = useState<Item[]>([]);
    const {saveRecentItems} = useRecentItems();

    const handleRecent = (id : number) =>{
        saveRecentItems(id);
    }

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`/api/items/?categoryId=${categoryId}`); // get all items in the category
            const data: Item[] = await response.json();
            data.forEach((item) => {
                if(item.name === itemName){ // remove the item that is already displayed
                    data.splice(data.indexOf(item),1); 
                }
            });
            setItems(data || []);
        };
        fetchItems();
      
    }, [categoryId]);
        

    return (
        <div>
            <div className="mt-5 mb-2 font-bold text-lg"><span >{items[0]?.category.name}</span> 関連図書</div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={1}
                slidesPerView={6}
                navigation
                breakpoints={{
                    320 : { slidesPerView: 3 }, 
                    768 : { slidesPerView: 4 }, 
                    1024 : { slidesPerView: 6 }, 
                  }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/itemdetail/${item.id}` } onClick = {() => handleRecent(item.id)}>
                            <img className='w-40  border-[1px] rounded-md' 
                            src={`/uploads/${item.itemImgs?.[0].attachedFileName}`}
                            alt={item.name}
                            />
                            <p className="w-32 ">{item.name}</p>
                        </Link>
                        
                    </SwiperSlide>
                ))} 
            </Swiper>

           
        </div>
    )
}