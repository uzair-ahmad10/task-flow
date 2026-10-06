import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import TaskPage from "./pages/TaskPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/PageLoader";
import { useEffect } from "react";

const App = () => {

  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  
  if(isCheckingAuth) return <PageLoader/>;

  return (
    <>
      <div className="bg-linear-to-b from-orange-50 via-stone-100 to-indigo-100/50 h-screen flex justify-center items-center">
        <Routes>
          <Route index path="/" element={authUser ? <TaskPage/> : <Navigate to="/login"/>} />
          <Route path="/login" element={!authUser ? <Login/> : <TaskPage/>} />
          <Route path="/signup" element={!authUser ? <Signup/> : <Login/>}/>
                    
          {/* This catches all wrong URLs */}
          <Route path="*" element={<NotFound />}/>
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;