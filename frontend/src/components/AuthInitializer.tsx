"use client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { userApi } from "@/api/userApi";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; // already fetched
    initialized.current = true;
    
    const fetchUser = async () => {
      try {
        const response = await userApi.me();
        if (response.success) {
            console.log(response)
          dispatch(setUser(response.data));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
        console.error(err);
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
}
