import {
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import screen from "../assets/screen.png";
import {useAuthStore} from "../store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";


const Signup = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse)=>{
    await googleAuth({ credential: credentialResponse.credential });
  }

  const handleError = () => {
    console.error("Google Sign-Up Failed");
    toast.error("Google Authentication Failed")
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, isGoogleAuth, signup, googleAuth } = useAuthStore();

  const handleForm = (e)=>{
    e.preventDefault();
    signup(formData);
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-center p-4 sm:p-6 gap-5 lg:gap-7">

      {/* left side of the container */}

      <div className="hidden lg:flex flex-col justify-between px-7 py-5 min-h-[87vh] w-full max-w-sm rounded-2xl bg-linear-to-b from-orange-300 via-stone-300 to-indigo-300 shadow border-gray-200 border">

        
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img className="h-10 w-10" src={screen} alt="Logo" />
              <h3 className="font-bold text-2">TaskFlow</h3>
            </div>

            <div className= "bg-white rounded-3xl px-2 shadow">
              <p className="text-2">v0.0.1</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-5" >

            <div className="h-[40%]  bg-orange-200 rounded-2xl shadow pb-3 text-center">
              <h3 className="text-md font-semibold text-center">Brand Design Relaunch</h3>
              <p className="text-sm text-gray-700">
                Collect all the details from the client and make adjustments.
              </p>
            </div>

            <div className="h-[40%]  bg-purple-300 rounded-2xl shadow pb-3 text-center">
              <h3 className="text-md font-semibold text-center">Launch Roadmap-Q3</h3>
              <p className="text-sm text-gray-700 ">
               Just wanted to drop the new arrivals of my brand as soon as possible. 
              </p>
            </div>
            
          </div>

          <div className=" bg-white flex flex-col justify-center items-center rounded-2xl py-1 shadow">
            <p className="text-gray-600 font-medium text-sm">Tackle Frictionless Board</p>
            <p className="text-xs text-gray-500">Loved by 40,000+ Users</p>
          </div>
        

      </div>

      {/* // right side of the container */}
      <div className="flex flex-col justify-center gap-6 sm:gap-8 px-5 py-7 sm:px-8 sm:py-8 min-h-[70vh] md:min-h-[80vh] w-full max-w-xl rounded-2xl shadow bg-white border-gray-200 border">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Times_New_Roman']">Create your Workspace</h2>
          <p className="text-sm sm:text-[15px] text-gray-500">Start Organizing your tasks and Colorful stick notes in seconds</p>
        </div>

        <div>
          <form className="flex flex-col justify-center gap-2" onSubmit={handleForm}>
            {/* FULL NAME */}

            <div>
              <label className="font-semibold">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />

                <input
                  
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:border-transparent outline-gray-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-semibold">Work Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:border-transparent outline-gray-300"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />

                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:border-transparent outline-gray-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="bg-black text-amber-50 font-semibold rounded-3xl p-2 mt-2 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black transition mb-2 duration-300 " type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="flex flex-col justify-center gap-3">
            <p className="text-center text-gray-700">OR CONTINUE WITH</p>
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} text="signup_with" disabled={isGoogleAuth} width="240" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-[17px] text-gray-500">
              Already have an account? <span className="text-black">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
