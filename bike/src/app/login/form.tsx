"use client";

import { signIn } from 'next-auth/react'
import React,{ ReactHTMLElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

enum FormType {
    LOGIN = 'login',
    REGISTER = 'register',
}



export default function LoginPage() {

  const [formType, setFormType] = useState(FormType.LOGIN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter();
  const [company, setCompany] = useState('')


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const res = await signIn("credentials", { email, password, redirect: false });

      if (res?.error) {
        setErrorMessage("Invalid email or password");
        return;
      }

      router.replace("profile");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!name || !email || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {

      const res1 = await fetch('api/auth/userExists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company}),
      });

      const {user} = await res1.json();

      if (user) {
        setErrorMessage('User already exists');
        return;
      }

      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company}),
      });

      if (res.ok) {
        const form = e.target;
        (form as HTMLFormElement).reset();
        toggleFormType();
      } else {
        console.log("Error during registration");
      }

 
    } catch (error) {
      console.error(error);
    }

  }


  const toggleFormType = () => {
    setFormType((prevFormType) =>
      prevFormType === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN
    );
  };

  return (
  <div className='grid place-items-center h-screen'>
    <div className='shadow-lg p-5 rounded-lg border-t-4 border-blue-400'>
      <h1 className='text-xl font-bold my-4 text-center'>{formType === FormType.LOGIN ? "Login" : "Register"}</h1>

      <form className="flex flex-col gap-3" onSubmit={formType === FormType.LOGIN ? handleLogin : handleRegister}>
        {formType === FormType.REGISTER && (
            <div className='flex flex-col gap-3'>
                <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Company" onChange={(e) => setCompany(e.target.value)}/>
            </div>
        )}
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/> 
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
          {formType === FormType.LOGIN ? "Login" : "Register"}
        </button>

          {errorMessage && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errorMessage}
            </div>
          )}
        <div className="text-sm mt-3 text-right hover:underline cursor-pointer" onClick={toggleFormType}>
          {formType === FormType.LOGIN ? "No account yet? Register" : "Already have an account? Login"}
        </div>
      </form>
    </div>
  </div>
  )
}
