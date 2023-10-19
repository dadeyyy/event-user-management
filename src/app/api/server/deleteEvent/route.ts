import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type deleteBody = {
  id: number;
};

export async function DELETE(request: Request) {
  try {
    const data: deleteBody = await request.json();
    const uniqeEvent = await prisma.event.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!uniqeEvent) {
      return NextResponse.json({ error: 'Event not found' });
    }

    if (data && uniqeEvent) {
      await prisma.eventAttendee.deleteMany({
        where: {
          event_id: uniqeEvent.id,
        },
      });

      const deleteEvent = await prisma.event.delete({
        where: {
          id: data.id,
        },
      });

      return NextResponse.json(deleteEvent);
    } else {
      NextResponse.json({ error: 'Failed to delete event' });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error to delete event!' });
  }
}
