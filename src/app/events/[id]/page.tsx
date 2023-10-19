import prisma from '@/lib/prisma';
import EventButton from './event-button';
import Link from 'next/link';

export default async function EventQR({
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
  const eventAttendee = await prisma.eventAttendee.findMany({
    where:{
      event_id: id
    },
    include:{
      employee: true,
      event: true
    }
  })
  

  
  if(eventAttendee){
    return (
      <>
      <div>
        {event && (
          <ul>
          <li>{event.id}</li>
          <li>{event.name}</li>
          <li>{event.date.toString()}</li>
          <li>{event.status}</li>
          <EventButton eventID={event.id} status={event.status}/>
          <Link href={`/events/${event.id}/scanner`}><li>Scan</li></Link>
        </ul>
        )}
        
      </div>
      <div>
        {eventAttendee.map((eventAttendee)=>(
          <ul key={eventAttendee.employee_id}>

            <h1>Employee ID :{eventAttendee.employee.id}</h1>
            <h1>Last Name: {eventAttendee.employee.lastName}</h1>
            <h1>First Name: {eventAttendee.employee.firstName}</h1>
          </ul>
        ))}
      </div>
      
      </>
    )
  }
  return (
    <h1>No Event Attendees</h1>
  )
}
