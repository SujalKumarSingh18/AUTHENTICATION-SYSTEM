"use client";
import Link from "next/link";
import React , { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user , setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const [loading , setLoading] = React.useState(false);

    const onSignup = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup" , user);
            console.log("Signup success" , response.data);
            router.push("/login");
            console.log("Redirect attempted")
        } catch (error : any) {
            console.log(error.response?.data);
            console.log("Signup failed" , error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        if (user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    } , [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(el) => setUser({...user , username: el.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(el) => setUser({...user , email: el.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(el) => setUser({...user , password: el.target.value})}
                placeholder="password"
            />
            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600">
                {buttonDisabled ? "Add All Fields to Signup" : "Signup"}
            </button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}