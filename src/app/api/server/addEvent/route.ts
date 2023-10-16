import { NextResponse } from "next/server"
import { TeventSchema, eventSchema } from "@/lib/types"
import prisma from "@/lib/prisma"

export async function POST(request: Request){
    try{
        const data:TeventSchema = await request.json()
    const validateEvent = eventSchema.safeParse(data)

    if(data && validateEvent.success){
        const newEvent = await prisma.event.create({
            data: data
        })
        return NextResponse.json(newEvent)
    }

    return NextResponse.json({error:"Cannot create a new event"})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error: "Erorr creating new event!"})
    }
}