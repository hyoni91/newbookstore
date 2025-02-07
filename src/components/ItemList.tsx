"use client";
import { Category, Item } from '@/types/item';
import { useEffect, useState } from 'react';

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
    }, [selectedCategory, mounted]);

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
            <div className="flex flex-wrap gap-8 justify-center items-center">
                {items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.itemImgs?.[0]?.attachedFileName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;