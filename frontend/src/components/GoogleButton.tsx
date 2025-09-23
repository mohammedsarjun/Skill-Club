"use client";

import { useEffect } from "react";
import axios from "axios";

export default function GoogleLogin() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,window.location.origin)
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).google) {
        clearInterval(interval);

        const google = (window as any).google;
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("googleSignInBtn"),
          { theme: "outline", size: "large", width: 240 }
        );

        google.accounts.id.prompt(); // optional auto-popup
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        idToken: response.credential,
      });
      console.log("User info:", res.data.user);
      localStorage.setItem("token", res.data.user.email); // example
    } catch (err) {
      console.error(err);
    }
  };

  return <div id="googleSignInBtn" className="flex justify-center"></div>;
}
