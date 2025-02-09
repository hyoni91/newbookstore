"use client";
import { Category, Item } from '@/types/item';
import { useEffect, useState } from 'react';
import { Swiper , SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const ItemList = ({initialItems, initialCategories}:{initialItems:Item[], initialCategories:Category[]}) => {
    const [mounted, setMounted] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);    
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    useEffect(() => {
        setMounted(true);
        setItems(initialItems);
        setCategories(initialCategories);
    }, [initialItems, initialCategories]);

    useEffect(() => {
        if (!mounted) return;
        
        const fetchItems = async () => {
            const response = await fetch(`/api/items${selectedCategory ? `?categoryId=${selectedCategory}` : ''}`);
            const data: Item[] = await response.json();
            setItems(data || []);
        };
        fetchItems();
      
    }, [selectedCategory,]);


    if (!mounted) return null;

    return (
        <div>
            <div className="flex text-1xl flex-wrap gap-16 justify-center items-center">
                <p className="cursor-pointer hover:border-b-2 border-black" 
                  onClick={() => setSelectedCategory(null)}
                  >
                    All
                </p>
                {categories.map((category) => (
                    <p className="cursor-pointer hover:border-b-2 border-black"  
                      key={category.id} 
                      onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={window.innerWidth < 768 ? 2 : 6}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img className='w-64 border-2' src={`uploads/${item.itemImgs?.[0].attachedFileName}`}/>
                        <p>{item.category.name}</p>
                        <p>{item.name}</p>
                        <p>¥{item.price.toLocaleString()}</p>
                    </SwiperSlide>
                ))} 
            </Swiper>
        </div>
    );
};

export default ItemList;