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

  const paramsId = parseInt(params.id)

  const employee = await prisma.employee.findUnique({
    where:{
      id: paramsId
    }
  })

  if(employee){
    return (
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
        <QRCode id={employee.id} />
        <EditEmployee employee={employee}/>
        <DeleteEmployee id={employee.id}/>
      </>
    );
  }
  
}
