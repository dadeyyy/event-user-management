import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import SignOut from "@/components/sign-out"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(options)

  if(session){
    return (
      <div>
        <h1>{`Hello ${session.user.name}`}</h1>

      </div>
      )
  }
  redirect('/login')
  
}
