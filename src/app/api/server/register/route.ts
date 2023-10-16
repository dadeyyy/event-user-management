import { NextResponse } from "next/server"
import { userSchema, TUserSchema } from "@/lib/types"
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request){
    try{
        const body:TUserSchema = await request.json()

    const validateData = userSchema.safeParse(body);
    const userExist = await prisma.user.findUnique({
        where:{
            username: body.username
        }
    })

    if(validateData.success && userExist === null){
        const {username,password,email,role} = validateData.data
        const hashPassword = await hash(password,12)
        const newUser = await prisma.user.create({
            data:{
                username, password:hashPassword, email,role
            }
        })
        return NextResponse.json(newUser)
    }

    else{
        return NextResponse.json({errorMessage: "User exists / Failed to validate"})
    }
    }
    catch(e){
        console.log(e)
        return NextResponse.json({errorMessage:e})
    }
    


}