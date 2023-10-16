import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteEmployee from './delete';
import EditEmployee from './edit';
import AddEmployee from './add';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import NotFound from '@/components/not-found';
import { redirect } from 'next/navigation';
import QRCode from './[id]/qrcode';

export const metadata: Metadata = {
  title: 'Employees',
};

export default async function EmployeesPage() {
  const session = await getServerSession(options);
  const allEmployee = await prisma.employee.findMany();

  if (session && session.user.role) {
    return (
      <>
        <div className="fixed top-0 right-0 m-4">
          <AddEmployee />
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Employee ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        extName
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Middle Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Position                      
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Office                      
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Office Assignment                      
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Detailed
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Role                   
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEmployee.map((employee) => (
                      
                      <tr
                        key={employee.id}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {employee.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                            {employee.lastName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.firstName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.extName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.middleName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.position}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.office}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.officeAssignment}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.detailed}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.role}
                        </td>
                        <td>
                          <Link href={`/employees/${employee.id}`}>QR</Link>
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
  else if(session && session.user.role ==="USER"){
    return <NotFound/>
  }
  else{
    redirect('/login')
  }
}
