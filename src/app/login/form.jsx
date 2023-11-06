"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form(){
  const router = useRouter()
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await signIn('credentials',{
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    })

    if (!response.error){
      router.push('/')
      router.refresh()
    }

    else{
      setError('Invalid username or password.')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mt-10 mx-auto p-6 text-center">
      <input name="username" className="border border-black" placeholder="Username:" type="text" />
      <input name="password" className="border border-black" placeholder="Password:" type="password" />
      <button type="submit" className="bg-black w-fit px-4 mx-auto text-white">Login</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  )

}