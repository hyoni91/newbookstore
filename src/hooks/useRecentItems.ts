import { Item } from "@prisma/client";
import { useEffect, useState } from "react";

const EXPIRATION_DAYS = 10; // 10 days


export const useRecentItems = () => {
    const [recentItems, setRecentItems] = useState<Item[]>([]);

    useEffect(() => {
        setRecentItems(getRecentItems());
      }, []);

    const saveRecentItems = (itemId: number) => {
        const now = new Date().getTime();
        const recentItems = JSON.parse(localStorage.getItem("recentItems") || "[]");

        const updatedItems = [
            { id : itemId, timeStamp: now }, // add new item
            ...recentItems.filter((item: { itemId: number; }) => item.itemId !== itemId) // remove duplicates
        ].slice(0, 5); // keep only 5 items ,[] --> new array

        localStorage.setItem("recentItems", JSON.stringify(updatedItems));
        setRecentItems(updatedItems.map((itemId=> itemId.id))); //date is not needed

    }

    const getRecentItems = () => {
        const now = new Date().getTime();
        const expirationTime = EXPIRATION_DAYS * 24 * 60 * 60 * 1000;// 10 days

        let recentItems = JSON.parse(localStorage.getItem("recentItems") || "[]");

        recentItems = recentItems.filter((item: { timeStamp: number; }) => now - item.timeStamp < expirationTime); // remove expired items

        localStorage.setItem("recentItems", JSON.stringify(recentItems));

        return recentItems.map((item: { id: number; }) => item.id);
    }

    return { recentItems, saveRecentItems, getRecentItems }; 

};