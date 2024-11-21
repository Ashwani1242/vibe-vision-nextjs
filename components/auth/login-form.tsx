"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/config";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [localStorageInstance, setLocalStorageInstance] = useState<Storage | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [reset, setReset] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    const url = `${BASE_URL}/api/auth/login`;
    try {
      const response = await axios.post(url, data);
      const { jwtToken, name, email } = response.data;

      localStorageInstance?.setItem('token', jwtToken);
      localStorageInstance?.setItem('loggedInUser', name);
      localStorageInstance?.setItem('loggedInUserEmail', email);

      window.location.href = "/entertainment-hub";
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setLocalStorageInstance(localStorage)
  }, []);

  return (
    <main className="w-full min-h-screen flex overflow-y-hidden">
      {/* ... previous code remains the same ... */}
      <div className="flex-1 relative flex items-center justify-center min-h-full">
        <img
          className="absolute inset-x-0 -z-1 -top-20 opacity-75"
          src="https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
          width={1000}
          height={1000}
          alt="background"
        />
        <div className="w-full max-w-md md:max-w-lg space-y-8 px-4 text-gray-600 sm:px-0 z-20">
          <div className="relative">
            <img
              src="https://farmui.com/logo.svg"
              width={100}
              className="lg:hidden rounded-full"
              alt="Logo"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-200 text-3xl font-semibold tracking-tighter sm:text-4xl">
                Log in to VibeVision
              </h3>
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-3">
            <button
              onMouseEnter={() => setReset(false)}
              onMouseLeave={() => setReset(true)}
              className="group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50"
            >
              <svg
                className={`w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all ${reset ? "translate-y-0" : "tranistion-transform"}`}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button
              onMouseEnter={() => setReset(false)}
              onMouseLeave={() => setReset(true)}
              className="group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50"
            >
              <svg
                className={`w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all ${reset ? "translate-y-0" : "tranistion-transform"}`}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937"
                  fill="#1DA1F2"
                />
              </svg>
            </button>
            <button
              onMouseEnter={() => setReset(false)}
              onMouseLeave={() => setReset(true)}
              className="group flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border-white/10 items-center justify-center py-5 border rounded-lg hover:bg-transparent/50 duration-150 active:bg-transparent/50"
            >
              <svg
                className={`w-5 h-5 group-hover:-translate-y-1 duration-300 transition-all ${reset ? "translate-y-0" : "tranistion-transform"}`}
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_910_44)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.0005 1.5742C30.6251 1.5742 36.4403 4.67578 40.1613 9.51823H40.107C42.3683 12.4883 43.7666 16.1531 43.7666 20.0816C43.7666 30.5526 35.3016 38.9653 24.0005 38.9653C12.6995 38.9653 4.23633 30.5526 4.23633 20.0816C4.23633 16.1531 5.63269 12.4883 7.89398 9.51823H7.83969C11.5607 4.67578 17.3759 1.5742 24.0005 1.5742ZM24.0005 11.7689C26.5924 11.7689 28.695 13.8512 28.695 16.4181C28.695 18.9851 26.5924 21.0673 24.0005 21.0673C21.4086 21.0673 19.306 18.9851 19.306 16.4181C19.306 13.8512 21.4086 11.7689 24.0005 11.7689Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_910_44">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg">
                {errorMessage}
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="font-medium text-gray-300">Email</label>
                <Input
                  type="email"
                  {...form.register("email")}
                  className="mt-2 w-full bg-transparent border-white/10 text-white focus:border-indigo-600"
                  placeholder="Enter your email"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    className="mt-2 w-full bg-transparent border-white/10 text-white pr-10 focus:border-indigo-600"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link 
                  href="/forgot-password" 
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-sm font-semibold rounded-lg 
                  bg-indigo-600 text-white hover:bg-indigo-500 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-300 ease-in-out"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg 
                      className="animate-spin h-5 w-5 mr-3" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;