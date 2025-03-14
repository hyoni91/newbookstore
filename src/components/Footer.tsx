"use client"

import useWindowWidth from "@/hooks/useWindowWidth"
import React from "react"

export default function Footer (){
    const windowWidth = useWindowWidth();

    return(
        <>
        {
            windowWidth < 768 ?
            <></>
            :
            <footer className=" bg-gray-50 mt-auto px-6 py-8 w-full ">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
            <p>© 2025 Book Shop. All rights reserved.</p>
            </div>
            </footer>
        }
        </>
    )
}