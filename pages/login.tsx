import { AuthUser, useAuth } from '@/contexts/AuthContext'
import authService, { checkLoggedIn, parseToken } from '@/services/auth.service'
import { GetServerSideProps } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = context.req.cookies["jwt"];

  if (token) {
    const authStatus = checkLoggedIn("USER", token);
    if (authStatus) {
      return {
        redirect: {
          permanent: false,
          destination: "/maindashboard",
        },
      }
    }
  }

  return { props: {} }
}


export default function Login() {
  const authContext = useAuth();

  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);

  const router = useRouter();

  const [email, setEmail]: any = useState();
  const [password, setPassword]: any = useState();

  function togglePasswordVisibility() {
    SetIsPasswordVisible((prevState) => !prevState)
  }

  //let authStatus = false;

  async function handleSubmit(e: any) {
    e.preventDefault();
    /* let params = {
      email,
      password
    }; */

    /* const data = Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&'); */

    const data = {
      email,
      password
    };

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include", // IMPORTANT: tell fetch to include jwt cookie
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(data)
    }).then((response) => {

      return response.json();

    }).then((data) => {

      // Returned data is a jwt token
      const user: AuthUser = parseToken(data["jwt"]);
      console.log(data["jwt"]);
      console.log(user.email);

      authContext.setUser(user);

      localStorage.setItem('user', JSON.stringify(user));

    }).finally(() => {
      router.push('/users');
    });

  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="grid grid-cols md:grid-cols-2 bg-inherit dark:bg-inherit">
        <div className="hidden md:block border-0">
          <img src="/ICT.jpg" className="max-w-full h-full object-cover border-0"></img>
        </div>
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
                  <button
                    type="button"
                    className="flex-auto w-full py-5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-inherit text-gray-700 shadow-sm align-middle hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  >
                    <svg
                      className="w-4 h-auto"
                      width={46}
                      height={47}
                      viewBox="0 0 46 47"
                      fill="none"
                    >
                      <path
                        d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                        fill="#34A853"
                      />
                      <path
                        d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                        fill="#EB4335"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                  <div className="py-4 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                    Or
                  </div>
                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
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
                      {/* End Form Group */}
                      <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Dont&apos;t have an account?
                          <Link className="text-blue-600 decoration-2 hover:underline font-medium ml-1" href="/signup">
                            Sign up here
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="flex-auto py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                  {/* End Form */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
