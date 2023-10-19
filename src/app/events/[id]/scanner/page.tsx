import prisma from "@/lib/prisma";
import Scanner from "./scanner";

export default async function ScannerPage({
    params,
    searchParams,
  }: {
    params: { id: string; slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }) {

    const id = parseInt(params.id);

  const event = await prisma.event.findUnique({
    where:{
      id: id
    }
  })

  
  if(event){
    return(
        <div>
            <Scanner event_id={event.id}/>
        </div>
    )
  }
}
