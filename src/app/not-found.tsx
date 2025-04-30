import React from "react";

export default function NotFound() {

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-20">ご不便をおかけして申し訳ございません。</h1>
            <p className="text-center mt-4">現在のページは存在しません。</p>
            <p className="text-center mt-2">URLを確認するか、ホームページに戻ってください。</p>
            <div className="flex justify-center mt-10">
                <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">Go to Home</a>
            </div>
            <img className="w-1/2 mx-auto mt-10" src="/images/404.jpg" alt="Not Found" />

        </div>
    )
}