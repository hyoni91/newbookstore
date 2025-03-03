"use client"

import { Item } from '@/types/item';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const PopularBooks = () => {
    const [books, setBooks] = useState<Item[]>([])
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);


    // if (!Array.isArray(books)) {
    //     return <div>No books available</div>; // books가 배열이 아닐 경우 처리
    //   }
  

    useEffect(()=>{
        const fetchBooks = async ()=> {
            setIsLoading(true);
            try {
                const response = await fetch("/api/items/popularitems");
                const data: Item[] = await response.json();
                setBooks(data || []);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    },[])

    console.log("Popular-Books : ", books)

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div className='mt-14'>
                    <h1 className='font-bold'>カートランキング</h1>
                    <div className='mt-5 grid grid-rows-3 grid-flow-col gap-2 overflow-auto'>
                        {
                            books.map((item,id)=>{
                                return(
                                    // <div key={id} className='grid grid-cols-3 grid-flow-col gap-4  '>
                                        <div key={id} className='flex gap-8'>
                                            <div onClick={()=>{router.push(`/itemdetail/${item.id}`)}} >
                                                <img className='w-20 cursor-pointer border-[1px] rounded-md' src={`/uploads/${item.itemImgs?.[0].attachedFileName}`}/>
                                            </div>
                                            <div className='flex gap-8 items-center'>
                                                <h4 className='font-bold'>{id+1}</h4>
                                                <div className='w-40'>
                                                    <span className='text-xs'>{item.category.name}</span>
                                                    <p onClick={()=>{router.push(`/itemdetail/${item.id}`)}} className='cursor-pointer' >{item.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    // </div>
                                )
                            })
                        }
                       
                    </div>
                </div>
            
        </div>
    );
};

export default PopularBooks;