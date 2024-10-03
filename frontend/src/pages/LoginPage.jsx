 import { useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    const handleSignIn=(e)=>{
        e.preventDefault()
        console.log(email, password)
    }
    return (
        <div className="h-screen w-full hero-bg">
           <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link to="/">
            <img src="/netflix-logo.png" alt="logo" className="w-52" />
            </Link>
           </header>
           <div className="flex justify-center items-center  mx-3">
            <div className="w-full max-w-md p-8 space-y-4 bg-black/60 rounded-lg shadow-md">
              <h1 className="text-center text-white text-2xl font-bold mb-4">
                Sign In
              </h1>
               <form onSubmit={handleSignIn} className="space-y-3">
                 <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                        Email
                    </label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" 
                     className="w-full px-3 py-2 mt-1 border border-gray-700 
                    rounded-md bg-transparent text-white focus:outline-none focus:ring"
                    placeholder="you@emaple.com" id="email"/>
                 </div>
     
    
                 <div>
                                <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                    placeholder='••••••••'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                 <button   className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
                 hover:bg-red-700"> 
                    Sign Ip
                 </button>
               </form>
               <div className="text-center text-gray-400">
                       Not a member?
                       <Link to='/signup' className="text-red-500 hover:underline ml-2">Sign Un</Link>
               </div>
            </div>
    
           </div>
        </div>
      )
}

export default LoginPage
