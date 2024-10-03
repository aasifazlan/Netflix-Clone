import { Route, Routes } from "react-router-dom" 
import { BrowserRouter } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Footer from "./components/Footer"
 
 
function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/> } />
      <Route path='/login' element={<LoginPage/> } />
      <Route path='/signup' element={<SignUpPage/> } />
     </Routes>
     <Footer/>
     </BrowserRouter>
     )
    }

export default App
