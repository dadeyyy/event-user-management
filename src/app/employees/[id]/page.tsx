import { compareSync } from "bcrypt";
import QRCode from "./qrcode";
import prisma from "@/lib/prisma";
import EditEmployee from "./edit";
import DeleteEmployee from "./delete";

export default async function GenerateQRPage({
  params,
  searchParams,
}: {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const paramsId = parseInt(params.id);
  const employee = await prisma.employee.findUnique({
    where: {
      id: paramsId,
    },
  });
  if (employee) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="card card-image-cover pt-5">
          <div className="flex items-center justify-center">
            <QRCode id={employee.id} />
          </div>
          <div className="card-body">
            <h2 className="card-header">Employee Details</h2>
            <ul className="text-content2">
              <li>
                First Name:
                <span className="font-bold"> {employee.firstName}</span>
              </li>
              <li>
                Last Name:
                <span className="font-bold"> {employee.lastName}</span>
              </li>
              <li>
                Middle Name:
                <span className="font-bold"> {employee.middleName}</span>
              </li>
              <li>
                Ext Name: <span className="font-bold"> {employee.extName}</span>
              </li>
              <li>
                Position:{" "}
                <span className="font-bold"> {employee.position}</span>
              </li>
              <li>
                Office:<span className="font-bold"> {employee.office}</span>
              </li>
              <li>
                Office Assignment:
                <span className="font-bold"> {employee.officeAssignment}</span>
              </li>
              <li>
                Detailed:{" "}
                <span className="font-bold"> {employee.detailed}</span>
              </li>
              <li>
                Role: <span className="font-bold"> {employee.role}</span>
              </li>
            </ul>
            <div className="card-footer">
              <EditEmployee employee={employee} />
              <DeleteEmployee id={employee.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
