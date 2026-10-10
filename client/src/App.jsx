import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import TaskPage from "./pages/TaskPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/PageLoader";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Catalog from "./components/Catalog";
import User from "./components/User";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <div className="bg-linear-to-b from-orange-200 via-stone-200 to-indigo-200/50 min-h-screen">
        <Routes>
          <Route
            path="/task"
            element={authUser ? <TaskPage /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} /> {/* loads at /task */}
            <Route path="dashboard" element={<Dashboard />} />
            {/* /task/dashboard */}
            <Route path="user" element={<User />} /> {/* /task/user */}
            <Route path="catalog" element={<Catalog />} /> {/* /task/catalog */}
          </Route>

          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/task" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/task" />}
          />

          {/* This catches all wrong URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;
