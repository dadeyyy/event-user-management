
import { options } from "../api/auth/[...nextauth]/options"
import LogInForm from "./login-form"
import { getServerSession } from "next-auth"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Log-in'
};

export default async function LogIn() {

  const session = await getServerSession(options)

  if(!session){
    return (
      <div className="flex items-center justify-center w-full h-screen">
      <LogInForm />
      </div>
    )
  }

  return(
    <>
      <h1>Already logged in!</h1>
    </>
  )
}