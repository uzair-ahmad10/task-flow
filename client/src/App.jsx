import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import TaskPage from "./pages/TaskPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App = () => {

  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  

  return (
    <>
      <div className="bg-linear-to-b from-orange-50 via-stone-100 to-indigo-100/50 h-screen flex justify-center items-center">
        <Routes>
          <Route index path="/" element={<TaskPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
                    
          {/* This catches all wrong URLs */}
          <Route path="*" element={<NotFound />}/>
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;