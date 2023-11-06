"use client"
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";


export default function Form(){

  const router = useRouter()
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
      const response = await fetch("api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      })
    });
    if(response.status === 201){
      const response = await signIn('credentials',{
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false
      })
      router.push('/')
      router.refresh()
    }

    else{
      const responseData = await response.json()
      setError(responseData)
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mt-10 mx-auto p-6">
      <input name="username" className="border border-black" placeholder="Username:" type="text" />
      <input name="password" className="border border-black" placeholder="Password:" type="password" />
      <button type="submit" className="bg-black w-fit px-4 mx-auto text-white">Register</button>
      {error && <div className="text-red-500">{error.message}</div>}
    </form>
  )

}