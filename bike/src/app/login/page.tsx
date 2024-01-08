"use client";

import Email from 'next-auth/providers/email'
import { signIn } from 'next-auth/react'
import React,{ ReactHTMLElement, useState } from 'react'
import Link from 'next/link'

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('custom', { email, password });

    if (!name || !email || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    if (result?.error) {
      console.error(result.error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!name || !email || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        (form as HTMLFormElement).reset();
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
    /* <div className='flex flex-col items-center bg-white justify-center h-screen ' >
        <div >
            {formType === FormType.LOGIN ? ( <h2 className='text-2xl font-bold mb-4'>Login</h2> ) 
            : ( <h2 className='text-2xl font-bold mb-4'>Register</h2> )}
        </div>
        <form onSubmit={formType === FormType.LOGIN ? handleLogin : handleRegister} className='flex flex-col items-center'>
          <div className='mb-4 '> 
              <input
              type="text"
              className="border border-gray-400 p-2 w-full rounded"
              value={email}
              id='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='mb-4'>
              <input 
              type="password" 
              className="border border-gray-400 p-2 w-full rounded"
              value={password}
              id='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="flex flex-col justify-between items-center mb-4">
              <div
                  className="hover:underline cursor-pointer"
                  onClick={toggleFormType}
              >
                  {formType === FormType.LOGIN
                  ? "No account yet? Register"
                  : "Already have an account? Login"}
              </div>
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {formType === FormType.LOGIN ? "Login" : "Register"}
            </button>
          </div>
        </form>
    </div> */

  <div className='grid place-items-center h-screen'>
    <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
      <h1 className='text-xl font-bold my-4 text-center'>{formType === FormType.LOGIN ? "Login" : "Register"}</h1>

      <form className="flex flex-col gap-3" onSubmit={formType === FormType.LOGIN ? handleLogin : handleRegister}>
        {formType === FormType.REGISTER && (
          <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        )}
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/> 
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
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
