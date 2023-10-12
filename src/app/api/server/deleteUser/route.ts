import { NextResponse } from 'next/server';
import { Tuser } from '@/app/users/delete';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export async function DELETE(request: Request) {
  try {
    const data: Tuser = await request.json();
    const userId = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!userId) {
      return NextResponse.json({ error: 'User not found' });
    }

    console.log(data);

    if (data && userId) {
      const deleteUser = await prisma.user.delete({
        where: {
          id: data.id,
        },
      });
      return NextResponse.json(deleteUser);
    } else {
      NextResponse.json({ error: 'Failed to delete user' });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
