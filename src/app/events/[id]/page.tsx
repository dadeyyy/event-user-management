import prisma from '@/lib/prisma';


export default async function EventQR({params,searchParams,}: {params: { id: string; slug: string };
searchParams: { [key: string]: string | string[] | undefined };
}) {



  const id = parseInt(params.id)
  const event = await prisma.event.findUnique({
    where:{
      id: id
    }
  })

  if(event){
    return (
      <div className='ml-5 flex'>
        <div className="event-infos">
            <h1>id: <span>{event.id}</span></h1>
            <h1>Event Name: <span>{event.name}</span></h1>
            <h1>Date: <span>{event.date.toString().split(":00 GMT")[0]}</span></h1>
            <h1>Status: <span>{event.status}</span></h1>
        </div>
      </div>
    )
  }
  
}
