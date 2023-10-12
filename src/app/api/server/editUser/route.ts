import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { TUserSchema, userSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function PUT(request: Request) {
  try {
    const body: TUserSchema = await request.json();
    const validateUser = userSchema.safeParse(body);

    if (validateUser.success) {
      const uniqueUser = await prisma.user.findUnique({
        where: {
          id: body.id,
        },
      });

      

      if (uniqueUser) {
        const { username, password, email, role } = body;
        const hashPassword = await hash(password, 12);
        const updatedUser = await prisma.user.update({
          where: {
            id: uniqueUser.id
          },
          data: {
            username: username,
            password: hashPassword,
            email: email,
            role: role,
          },
        });

        return NextResponse.json(updatedUser);
      } else{
        return NextResponse.json({ error: 'User not found!' });
      }
    }

    return NextResponse.json({ error: 'Error validating a user' });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Cannot update user!"});
  }
}
