import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SignOut from './sign-out';

async function SideNav() {
  const session = await getServerSession(options);

  if (session && session.user) {
    return (
      <div className="min-h-screen flex flex-row bg-gray-100 shadow-lg">
        <div className="flex flex-col w-56 bg-white overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl uppercase text-indigo-500">Admin</h1>
          </div>
          <ul className="flex flex-col py-4">
            {session.user.role === 'ADMIN' && (
              <li>
                <Link
                  href="/users"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-xl text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>

                  <span className="text-lg font-medium">Users</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/employees"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-music"></i>
                </span>
                <span className="text-lg font-medium">Employees</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out"></i>
                </span>
                <SignOut />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }


}

export default function NavMenu() {
  return (
    <div>
      <SideNav />
    </div>
  );
}
