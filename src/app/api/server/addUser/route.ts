import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { TUserSchema, userSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

//User validation schema with zod

export async function POST(request: Request) {
  try {
    const body: TUserSchema = await request.json();
    const validateUser = userSchema.safeParse(body);

    if (validateUser.success) {
      const userExist = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });

      if (userExist === null) {
        const { username, password, email, role } = body;
        const hashPassword = await hash(password, 12);
        const newUser = await prisma.user.create({
          data: {
            username,
            password: hashPassword,
            email,
            role,
          },
        });
        revalidatePath('/users');
        return NextResponse.json(newUser);
      }
      return NextResponse.json({ error: 'User already exists' });
    }

    return NextResponse.json({error:"User validation failed!"})

  } catch (e: any) {
    return NextResponse.json({error: `Error: ${e.message}`})
  }
}
