"use client";

import { CreateItemRequest } from "@/types/item";
import { Category } from "@prisma/client";
import { useState } from "react";

export default function ItemForm({ initialCategories }: { initialCategories: Category[] }) {
    const categories : Category[] = initialCategories;

    const [itemFormData, setItemFormData] = useState<CreateItemRequest>({
        name: '',
        price: 0,
        intro: '',
        categoryId: 1,
        mainImg: undefined,
        subImg: undefined,
    });

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>, type: 'mainImg'| 'subImg') =>{
        const file = e.target.files?.[0];
        if(file){
            setItemFormData((prev)=>({...prev, [type]: file}));
        }

    }

    const handleSubmit = async (e:React.FormEvent)=>{

        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name',itemFormData.name);
        formDataToSend.append('price', itemFormData.price.toString());
        formDataToSend.append('intro', itemFormData.intro || '');
        formDataToSend.append('categoryId', itemFormData.categoryId.toString());
        formDataToSend.append('mainImg', itemFormData.mainImg || '');
        formDataToSend.append('subImg', itemFormData.subImg || '');

        const response = await fetch('/api/admin/items',{
            method : 'POST',
            body : formDataToSend,
        });

        const data = await response.json(); 
        console.log(data)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <select name="categoryId" id="categoryId" onChange={(e)=>setItemFormData({...itemFormData, categoryId: Number(e.target.value)})}>
                    {categories.map((category:Category)=>(
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <div>
                    <label htmlFor="name">商品名</label>
                    <input type="text" id="name" value={itemFormData.name} onChange={(e)=>setItemFormData({...itemFormData, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="price">値段</label>
                    <input type="number" id="price"  onChange={(e)=>setItemFormData({...itemFormData, price: Number(e.target.value)})}/>
                </div>
                <div>
                    <label htmlFor="intro">商品紹介</label>
                    <textarea id="intro" value={itemFormData.intro} onChange={(e)=>setItemFormData({...itemFormData, intro: e.target.value})}/>
                </div>
                
                <div>
                    <label htmlFor="mainImg">メインイメージ</label>
                        <input type="file" id="mainImg" onChange={(e)=>handleFileChange(e, 'mainImg')}/>
                </div>
                <div>
                    <label htmlFor="subImg">説明イメージ</label>
                    <input type="file" id="subImg" onChange={(e)=>handleFileChange(e, 'subImg')}/>
                </div>
                <button type="submit">登録する</button>
                <button type="button" onClick={()=>setItemFormData({...itemFormData, mainImg: undefined, subImg: undefined})}>初期化</button>
            </form>
        </div>
    )
}