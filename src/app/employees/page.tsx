import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteEmployee from "./delete";
import EditEmployee from "./edit";
import AddEmployee from "./add";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import NotFound from "@/components/not-found";
import { redirect } from "next/navigation";
import QRCode from "./[id]/qrcode";

export const metadata: Metadata = {
  title: "Employees",
};

export default async function EmployeesPage() {
  const session = await getServerSession(options);
  const allEmployee = await prisma.employee.findMany();

  if (session && session.user.role) {
    return (
      <div className="flex flex-col p-4">
        <div className="mb-2">
          <AddEmployee />
        </div>
        <div className="flex w-full overflow-x-auto">
          <table className="table-zebra table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Ext.</th>
                <th>Middle Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Office Assignment</th>
                <th>Detailed</th>
                <th>Role</th>
                <th>QR</th>
              </tr>
            </thead>
            <tbody>
              {allEmployee.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.extName}</td>
                  <td>{employee.middleName}</td>
                  <td>{employee.position}</td>
                  <td>{employee.office}</td>
                  <td>{employee.officeAssignment}</td>
                  <td>{employee.detailed}</td>
                  <td>{employee.role}</td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                        />
                      </svg>
                    </Link>
                  </td>
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
