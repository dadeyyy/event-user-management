import { NextResponse } from 'next/server';
import { TeventSchema, eventSchema } from '@/lib/types';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body: TeventSchema = await request.json();
    console.log(body)
    const validateEvent = eventSchema.safeParse(body);

    if (validateEvent.success) {
      const uniqueEvent = await prisma.event.findUnique({
        where: {
          id: body.id,
        },
      });

      if (uniqueEvent) {
        const { name, date, status } = body;

        const updateEvent = await prisma.event.update({
          where: {
            id: uniqueEvent.id,
          },
          data: {
            name,
            date,
            status,
          },
        });

        return NextResponse.json(updateEvent);
      }

      return NextResponse.json({ error: 'No event found' });
    }

    return NextResponse.json({ error: 'Failed to update the event' });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error updating the user' });
  }
}
