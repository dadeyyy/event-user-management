import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import AddEvent from './add';
import NotFound from '@/components/not-found';
import EditEvent from './edit';
import DeleteEvent from './delete';

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const session = await getServerSession(options);
  const allEvents = await prisma.event.findMany();

  if (session && session.user.role) {
    return (
      <div className="flex flex-col p-4">
        <div className="mb-2">
        <AddEvent />
      </div>
        <div className="flex w-full overflow-x-auto">
          <table className="table-hover table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <Link href={`/events/${event.id}`} className='badge '>{event.id}</Link>
                  </td>
                  <td>{event.name}</td>
                  <td>{event.date.toString().split(":00 GMT")[0]}</td>
                  <td>{event.status === "ONGOING"? (
                    <div className="badge badge-warning">{event.status}</div>
                  ) : ""} 
                  {event.status === "COMPLETED"? (
                    <div className="badge badge-success">{event.status}</div>
                  ) : ""}
                  {event.status === "CANCELLED"? (
                    <div className="badge badge-error">{event.status}</div>
                  ) : ""}
                  {event.status === "PLANNED"? (
                    <div className="badge badge-primary">{event.status}</div>
                  ) : ""}
                  </td>
                  <td><EditEvent event={event}/></td>
                  <td><DeleteEvent id={event.id}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (session && session.user.role === "USER") {
    return <NotFound />;
  } else {
    redirect("/login");
  }
}
