import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import SignOut from "@/components/sign-out"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(options)

  if(session){
    return (
      <div className="flex items-center justify-center h-full mx-auto">
        <h1 className="font-bold lg:text-6xl md:text-3xl sm:text-xl" >{`Hello ${session.user.name}!`}</h1>
      </div>
      )
  }
  redirect('/login')
  
}
