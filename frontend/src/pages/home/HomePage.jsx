import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
 

 

const HomePage = () => {
   const user= true;

  return (
    <div className="hero-bg h-screen">
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default HomePage
