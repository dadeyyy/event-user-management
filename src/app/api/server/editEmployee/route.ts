import { NextResponse } from 'next/server';
import { TEmployeeSchema, employeeSchema } from '@/lib/types';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body: TEmployeeSchema = await request.json();
    console.log(body)
    const validateEvent = employeeSchema.safeParse(body);

    if (validateEvent.success) {
      const uniqueEmployee = await prisma.employee.findUnique({
        where: {
          id: body.id,
        },
      });

      if (uniqueEmployee) {
        const updatedEmployee = await prisma.employee.update({
          where: {
            id: uniqueEmployee.id,
          },
          data: {
            ...body
          },
        });

        return NextResponse.json(updatedEmployee);
      }

      return NextResponse.json({ error: 'No employee found' });
    }

    return NextResponse.json({ error: 'Failed to update the employee' });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error updating the employee' });
  }
}
