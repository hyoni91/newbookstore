"use client"

import { Item } from '@/types/item';
import React, { useEffect, useState } from 'react';

const PopularBooks = () => {
    const [books, setBooks] = useState<Item[]>([])

    useEffect(()=>{
        const fetchBooks = async ()=> {
            const response = await fetch("/api/items/popularitems");
            const data : Item[] = await response.json();
            setBooks(data || []);
        } 
        fetchBooks();
    },[])

    console.log("Popular-Books : ", books)


    return (
        <div>
            <div className='mt-14'>
                    <h1 className='font-bold'>カートランキング</h1>
                    <div className='mt-5 flex flex-col gap-5'>
                        {
                            books.map((item,id)=>{
                                return(
                                    <div key={id} className='flex gap-8 '>
                                        <div>
                                            <img className='w-20 border-[1px] rounded-md' src={`/uploads/${item.itemImgs?.[0].attachedFileName}`}/>
                                        </div>
                                        <div className='flex gap-8 items-center'>
                                            <h4 className='font-bold'>{id+1}</h4>
                                            <div>
                                                <span className='text-xs'>{item.category.name}</span>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                </div>
            
        </div>
    );
};

export default PopularBooks;