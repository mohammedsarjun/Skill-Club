
"use client";
import { useEffect } from "react";
const jwt_decode: any = require("jwt-decode");
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

export default function AuthInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
         console.log(token)
        if (token) {
            const decoded:{userId: string; role: string | null; activeRole:string|null} = jwt_decode(token);
   
            dispatch(setUser(decoded));
        }
    }, [dispatch]);

    return null;
}
