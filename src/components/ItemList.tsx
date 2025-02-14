"use client";

import { Category, Item } from '@/types/item';
import { useEffect, useState } from 'react';
import { Swiper , SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from 'next/link';
import PopularBooks from './PopularBooks';


const ItemList = () => {
    const [mounted, setMounted] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);    
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(()=>{
        const fetchCategory = async () =>{
            const response = await fetch("/api/items/category");
            const data : Category[] = await response.json();
            setCategories(data || []);
        }
        fetchCategory();
    },[])
    

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`/api/items${selectedCategory ? `?categoryId=${selectedCategory}` : ''}`);
            const data: Item[] = await response.json();

            setItems(data || []);
        };
        fetchItems();
      
    }, [selectedCategory,]);


    if (!mounted) return null;

    const cateName = () =>{
        switch (selectedCategory) {
            
            case 1 : return( <>人気の小説</>)
            case 2 : return (<>IT技術を磨こう</>)
            case 3 : return(<>自分らしさを見つけ</>)
        
            default: return(<>今日のおすすめ</>)
                break;
        }
    }

    return (
        <div className='mt-6'>
            <div className="flex text-1xl flex-wrap  text-gray-900 gap-16 mb-10  justify-center items-center">
                <p className="cursor-pointer hover:text-gray-700" 
                  onClick={() => setSelectedCategory(null)}
                  >
                    All
                </p>
                {categories.map((category) => (
                    <p className="cursor-pointer hover:font-bold"  
                      key={category.id} 
                      onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
            <div className='font-bold text-lg mb-10'>
                {cateName()}
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={3}
                min-width={20}
                slidesPerView={window.innerWidth < 768 ? 3 : 6}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/pages/itemdetail/${item.id}`}>
                            <img className='w-44 border-[1px] rounded-md' src={`uploads/${item.itemImgs?.[0].attachedFileName}`}/>
                            <p className=''>{item.category.name}</p>
                            <p>{item.name}</p>
                            {/* <p>¥{item.price.toLocaleString()}</p> */}
                        </Link>
                        
                    </SwiperSlide>
                ))} 
            </Swiper>
            {
                selectedCategory == null?
                <PopularBooks />
                :
                <></>
            }
            
        </div>
    );
};

export default ItemList;