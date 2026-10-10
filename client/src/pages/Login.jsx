import logo from "../assets/screen.png";
import { MailIcon, LockIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {

  const {isLoggingIn, isGoogleAuth, login, googleAuth} = useAuthStore();

  const submitForm = async (e)=>{
    e.preventDefault();
    login(formData);
  }

  const handleError = () => {
    console.error("Google Sign-Up Failed");
  };

  const handleSuccess = async (credentialResponse)=>{
    await googleAuth({ credential: credentialResponse.credential });
  }

  const [formData, setFormData] = useState({email: "", password: ""});
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-linear-to-b from-orange-300 via-stone-300 to-indigo-300 flex flex-col items-center shadow rounded-3xl p-5 sm:p-7">
        <div className="flex flex-col items-center mb-2 text-center">
          <img className="h-15 w-15" src={logo} alt="task-flow-logo" />

          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">TaskFlow</h3>
            <div className="bg-orange-200 rounded-3xl px-1 font-light text-[10px]">
              v0.0.1
            </div>
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl">Welcome Back</h2>

          <p className="text-sm sm:text-base text-gray-500">
            Login to your workspace to organize and track notes
          </p>
        </div>

        <form onSubmit={submitForm} className="flex flex-col items-center w-full gap-1">
          <div className="w-full">
            <label className="font-semibold">Email</label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 size-5" />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-200 rounded-lg py-2 pl-10 pr-4 text-slate-500 placeholder-slate-500 focus:ring-2 focus:border-transparent outline-gray-300"
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold">Password</label>
            <div className="relative w-full">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 size-5" />

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full  bg-slate-200 rounded-lg py-2 pl-10 pr-4 text-slate-500 placeholder-slate-500 focus:ring-2 focus:border-transparent outline-gray-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
            <button className="w-full bg-black text-amber-50 font-semibold rounded-3xl p-2 mt-2 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black transition mb-2 duration-300 " type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Signin"
              )}
            </button>
        </form>

        <div className="flex flex-col items-center gap-2 mb-2 w-full">
          <p className="text-gray-500">OR CONTINUE WITH</p>
          <div className="flex justify-center w-full">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} disabled={isGoogleAuth} width="240" />
          </div>
        </div>

        <div>
          <Link to='/signup'>Don't Have Account? Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
