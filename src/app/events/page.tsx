import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import AddEvent from './add';
import NotFound from '@/components/not-found';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function UsersPage() {
  const session = await getServerSession(options);
  const allEvents = await prisma.event.findMany();

  if (session && session.user.role) {
    return (
      <>
        <div className="fixed top-0 right-0 m-4">
          <AddEvent />
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Event ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link className="hover:text-blue-500" href={`/`}>
                            {event.id}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {event.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {event.date.toString().split(':00 GMT')[0]}
                        </td>
                        <td className="px-6 py-4">{event.status}</td>
                        <td className="px-6 py-4">Edit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (session && session.user.role === 'USER') {
    return <NotFound />;
  } else {
    redirect('/login');
  }
}
