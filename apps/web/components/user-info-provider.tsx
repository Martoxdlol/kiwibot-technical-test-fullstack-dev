"use client"
import { createContext, useContext } from "react"

const userInfoContext = createContext({
    name: "",
    email: "",
})

export default function UserInfoProvider(props: {
    children: React.ReactNode,
    userInfo: {
        name: string,
        email: string,
    }
}) {
    return <userInfoContext.Provider value={props.userInfo}>
        {props.children}
    </userInfoContext.Provider>
}

export function useUserInfo() {
    return useContext(userInfoContext)
}