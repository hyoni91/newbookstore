"use client";
import React, { useEffect, useState } from 'react';

const ItemList = ({initialItems}:{initialItems:Item[]}) => {
    
    const [items,setItems] = useState(initialItems);
  
    useEffect(()=>{
      const fetchItems = async () => {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data);
      };
      fetchItems();
    },[]);

    return (
        <div>
            {items.map((item) => (
                <p key={item.id}>{item.name}</p>
            
            ))}
        </div>
    );
};

export default ItemList;