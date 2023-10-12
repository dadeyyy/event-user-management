import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import RegisterForm from "./register-form";
import { getServerSession } from "next-auth"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Register'
};


export default async function Register() {
  const session = await getServerSession(options)
  
  if(session && session.user.role === "USER"){
    redirect('/')
  }
  
  return(
    <div className="flex items-center justify-center w-full h-screen">
    <RegisterForm/>
    </div>
  )
}