import { Route, Routes } from "react-router-dom" 
import { BrowserRouter } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Footer from "./components/Footer"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import {Loader} from'lucide-react';
 
 
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

	// useEffect(() => {
	// 	authCheck();
	// }, [authCheck]);

	// if (isCheckingAuth) {
	// 	return (
	// 		<div className='h-screen'>
	// 			<div className='flex justify-center items-center bg-black h-full'>
	// 				<Loader className='animate-spin text-red-600 size-10' />
	// 			</div>
	// 		</div>
	// 	);
	// } 

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/> } />
      <Route path='/login' element={!user ? <LoginPage/> : <Navigate to={"/"} /> } />
      <Route path='/signup' element={<SignUpPage/> } />
     </Routes>
     <Footer/>
     </BrowserRouter>
     )
    }

export default App
