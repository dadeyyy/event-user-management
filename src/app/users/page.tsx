import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteUser from "./delete";
import EditUser from "./edit";
import AddUser from "./add";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const allUsers = await prisma.user.findMany();

  const sortedUsers = allUsers.sort((a, b) => {
    if (a.role === 'ADMIN' && b.role !== 'ADMIN') return -1;
    if (a.role !== 'ADMIN' && b.role === 'ADMIN') return 1;
    return 0;
  });

  return (
    <div className="flex flex-col p-4">
      <div className="mb-2">
        <AddUser />
      </div>
      <div className="flex w-full overflow-x-auto">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link
                    className="hover:text-blue-500"
                    href={`/users/${user.id}`}
                  >
                    {user.username}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "ADMIN" ? (
                    <div className="badge badge-primary">{user.role}</div>
                  ) : (
                    <div className="badge bg-slate-50">{user.role}</div>
                  )}
                </td>
                <td>
                  <DeleteUser id={user.id} />
                </td>
                <td>
                  <EditUser user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
