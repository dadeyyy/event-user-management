import { compareSync } from 'bcrypt';
import QRCode from './qrcode';
import prisma from '@/lib/prisma';
import EditEmployee from './edit';
import DeleteEmployee from './delete';

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
        <div>
          {employee && (
            <>
              <h1>{employee.firstName}</h1>
              <h1>{employee.lastName}</h1>
              <h1>{employee.middleName}</h1>
              <h1>{employee.extName}</h1>
              <h1>{employee.position}</h1>
              <h1>{employee.office}</h1>
              <h1>{employee.officeAssignment}</h1>
              <h1>{employee.detailed}</h1>
              <h1>{employee.position}</h1>
              <EditEmployee employee={employee} />
              <DeleteEmployee id={employee.id} />
            </>
          )}
        </div>
        <div className="card shadow-lg">
          <div className="card-body flex items-center justify-center">
            <QRCode id={employee.id} />
          </div>
          <div className="card-footer flex items-center justify-center pb-5">
            <h1 className="font-bold text-xl">SCAN THE QR OF THE EMPLOYEE</h1>
          </div>
        </div>
      </div>
    );
  }
}
