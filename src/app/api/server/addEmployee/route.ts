import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { TEmployeeSchema, employeeSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

//User validation schema with zod

export async function POST(request: Request) {
  try {
    const body: TEmployeeSchema = await request.json();
    const validateUser = employeeSchema.safeParse(body);

    if (validateUser.success) {
        const {detailed} = body;
        const newEmployee = await prisma.employee.create({
          data: {
            ...body,
            detailed: detailed
          }
        });

      return NextResponse.json(newEmployee);
    }

    return NextResponse.json({error: "Failed to validate data"})

  } catch (e: any) {
    return NextResponse.json({error: `Error: ${e.message}`})
  }
}
