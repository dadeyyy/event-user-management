import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type deleteEmployeeType = {
  id: number;
};

export async function DELETE(request: Request) {
  try {
    const data: deleteEmployeeType = await request.json();
    const uniqueEmployee = await prisma.employee.findUnique({
      where: {
        id: data.id,
      },
    });


    if (!uniqueEmployee) {
      return NextResponse.json({ error: 'Employee not found' });
    }

    if (data && uniqueEmployee) {
      const deletedEmployee = await prisma.employee.delete({
        where:{
          id: uniqueEmployee.id
        }
      })
      const employeeAttend = await prisma.eventAttendee.deleteMany({
        where: {
          employee_id: uniqueEmployee.id,
        },
      });

      return NextResponse.json(deletedEmployee);
    } else {
      NextResponse.json({ error: 'Failed to delete employee' });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error to delete employee!' });
  }
}
