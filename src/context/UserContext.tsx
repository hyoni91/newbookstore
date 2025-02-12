"use client"

import { useContext, createContext, useState } from "react";
import { UserContextType } from "@/types/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId , setUserId] = useState<string | null>(null)

    return(
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ():UserContextType => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    
    return context;
    
}