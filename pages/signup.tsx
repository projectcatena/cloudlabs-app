import ErrorToast from '@/components/elements/ErrorToast'
import { AuthUser, useAuth } from '@/contexts/AuthContext'
import { isLogin, parseToken } from '@/services/auth.service'
import { GetServerSideProps } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = context.req.cookies["jwt"];

  if (token) {
    const authStatus = isLogin("USER", token);
    if (authStatus) {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard",
        },
      }
    }
  }

  return { props: {} }
}

const inter = Inter({ subsets: ['latin'] })
export default function SignUp() {
  const authContext = useAuth();
  const router = useRouter();
  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    const data = {
      fullname,
      username,
      email,
      password
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        setIsError(true);
      }
      return response.json();

    }).then((data) => {

      // Returned data is a jwt token
      const user: AuthUser = parseToken(data["jwt"]);
      console.log(data["jwt"]);
      console.log(user.email);

      authContext.setUser(user);

      localStorage.setItem('user', JSON.stringify(user));

    }).catch(err => {
      console.log(err);
      //router.reload();
    })
    .finally(() => {
      if (isError == false) {
        router.push('/dashboard');
      }
      
    });
  }

  function togglePasswordVisibility() {
    SetIsPasswordVisible((prevState) => !prevState)
  }
  return (
    <div className="grid grid-cols md:grid-cols-2 bg-inherit dark:bg-inherit">
      <div className="border-0">
        <main className={`flex justify-center items-center h-full min-h-screen flex-col items-center dark:bg-slate-900 ${inter.className}`}>
          <div className="flex justify-center items-center h-full bg-inherit border-transparent rounded-xl shadow-sm dark:bg-inherit dark:border-transparent">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold white dark:text-white">
                  <span>Cloud</span>
                  <span className="text-blue-600">Labs</span>
                </h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg lg:text-xl text-white dark:text-white">
                  Cloud-Based Computing Labs for Academia
                </p>
              </div>
              <div className="mt-5">

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    {/* Form Group */}
                    <div className="flex-auto">
                      <label
                        htmlFor="fullname"
                        className="block text-sm mb-2 dark:text-white"
                      >
                      </label>
                      <div className="relative">
                        <input
                          type="name"
                          id="fullname"
                          name="fullname"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-white focus:ring-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900"
                          required
                          aria-describedby="name-error"
                          placeholder="Full Name"
                          value={fullname ?? ""}
                          onChange={e => setFullname(e.target.value)}
                          pattern='^[a-zA-Z]+$'
                        />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p className="hidden text-xs text-red-600 mt-2" id="name-error">
                        Please include your full name
                      </p>
                    </div>
                    {/* End Form Group */}

                    {/* Form Group */}
                    <div className="flex-auto">
                      <label
                        htmlFor="username"
                        className="block text-sm mb-2 dark:text-white"
                      >
                      </label>
                      <div className="relative">
                        <input
                          type="name"
                          id="username"
                          name="username"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-white focus:ring-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900"
                          required
                          aria-describedby="name-error"
                          placeholder="Username"
                          value={username ?? ""}
                          onChange={e => setUsername(e.target.value)}
                          pattern='^[a-zA-Z0-9]+'
                        />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p className="hidden text-xs text-red-600 mt-2" id="name-error">
                        Please include your username
                      </p>
                    </div>
                    {/* End Form Group */}

                    {/* Form Group */}
                    <div className="flex-auto">
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-white focus:ring-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900"
                          required
                          aria-describedby="email-error"
                          placeholder="Email Address"
                          value={email ?? ""}
                          onChange={e => setEmail(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                      </p>
                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div className="flex-auto">
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
                      </label>
                      <div className="relative">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-white focus:ring-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900"
                          required
                          aria-describedby="error"
                          placeholder="Password"
                          value={password ?? ""}
                          onChange={e => setPassword(e.target.value)}
                          // Minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
                          title='At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character and a minimum of 8 characters'
                        />
                        <div className="absolute top-3 right-3">
                          <button type='button' onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="2-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </button>
                        </div>

                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="password-error"
                      >
                        8+ Characters required
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?
                        <Link className="text-blue-600 decoration-2 hover:underline font-medium ml-1" href="/login">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="flex-auto py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"

                    >
                      Sign up
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden md:block border-0">
        <img src="/ICT.jpg" className="max-w-full h-full object-cover border-0"></img>
      </div>
      <ErrorToast isOpen={isError} onClose={() => setIsError((prev) => !prev)} errorMessage='Account already exits'></ErrorToast>
    </div>
  )
}
