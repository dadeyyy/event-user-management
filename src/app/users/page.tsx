import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteUser from './delete';
import EditUser from './edit';
import AddUser from './add'

export const metadata: Metadata = {
  title: 'Users',
};


export default async function UsersPage() {
  const allUsers = await prisma.user.findMany();

  return (
    <>
      <div className="fixed top-0 right-0 m-4">
        <AddUser />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          className="hover:text-blue-500"
                          href={`/users/${user.id}`}
                        >
                          {user.username}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.role}
                      </td>
                      <td className="px-6 py-4">
                        <DeleteUser id={user.id} />
                      </td>
                      <td className="px-6 py-4">
                        <EditUser user={user} />
                      </td>
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
}
