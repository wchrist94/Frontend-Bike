"use client"

import Email from 'next-auth/providers/email'
import { signIn } from 'next-auth/react'
import React,{ useState } from 'react'

enum FormType {
    LOGIN = 'login',
    REGISTER = 'register',
}


const Login: React.FC = () => {

  const [formType, setFormType] = useState(FormType.LOGIN)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signIn('email', { email })
  }
  
  const handleRegister = () => {
    signIn('email', { email, callbackUrl: 'http://localhost:3000/profile' })
  }

  const toggleFormType = () => {
    setFormType((prevFormType) =>
      prevFormType === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN
    );
  };

  return (
    <div className='flex flex-col items-center bg-white justify-center h-screen ' >
        <div >
            {formType === FormType.LOGIN ? ( <h2 className='text-2xl font-bold mb-4'>Login</h2> ) 
            : ( <h2 className='text-2xl font-bold mb-4'>Register</h2> )}
        </div>
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
            onClick={formType === FormType.LOGIN ? handleLogin : handleRegister}
          >
            {formType === FormType.LOGIN ? "Login" : "Register"}
          </button>
        </div>
    </div>
  )
}

export default Login
