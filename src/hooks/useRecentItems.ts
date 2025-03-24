import { useEffect, useState } from "react";

const EXPIRATION_DAYS = 10; // 10 days

export const useRecentItems = () => {
    const [recentItems, setRecentItems] = useState<number[]>([]); // 아이템의 id 배열로 설정

    useEffect(() => {
        setRecentItems(getRecentItems());
    }, []);

    const saveRecentItems = (itemId: number) => {
        const now = new Date().getTime();
        const recentItems = JSON.parse(localStorage.getItem("recentItems") || "[]");

        // 새로운 아이템을 추가하고, 중복된 아이템은 제거
        const updatedItems = [
            { id: itemId, timeStamp: now }, // add new item
            ...recentItems.filter((item: { id: number; }) => item.id !== itemId), // remove duplicates
        ].slice(0, 5); // 최근 5개 아이템만 유지

        // 로컬스토리지에 업데이트된 아이템 리스트 저장
        localStorage.setItem("recentItems", JSON.stringify(updatedItems));
        // state 업데이트 (id 배열만 저장)
        setRecentItems(updatedItems.map((item: { id: number }) => item.id));
    };

    const getRecentItems = () => {
        const now = new Date().getTime();
        const expirationTime = EXPIRATION_DAYS * 24 * 60 * 60 * 1000; // 10 days

        let recentItems = JSON.parse(localStorage.getItem("recentItems") || "[]");

        // 만료된 아이템 제거
        recentItems = recentItems.filter((item: { timeStamp: number; }) => now - item.timeStamp < expirationTime);

        // 로컬스토리지에 갱신된 리스트 저장
        localStorage.setItem("recentItems", JSON.stringify(recentItems));

        // 아이템의 id만 반환
        return recentItems.map((item: { id: number }) => item.id);
    };

    return { recentItems, saveRecentItems, getRecentItems };
};
