"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled , setButtonDisabled] = React.useState(false);
  const [loading , setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login" , user);
      console.log("Login success" , response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed" , error.message);
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect( () => {
    if (user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(el) => setUser({ ...user, email: el.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(el) => setUser({ ...user, password: el.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focuse:border-gray-600"
      >
        {buttonDisabled ? "Add All Fields to Login" : "Login"}
      </button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
