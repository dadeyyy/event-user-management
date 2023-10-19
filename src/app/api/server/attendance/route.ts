import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type bodyTypes = {
  employee_id: string;
  event_id: string;
};

export async function POST(request: Request) {
  try {
    const body: bodyTypes = await request.json();
    const employeeId = parseInt(body.employee_id);
    const eventId = parseInt(body.event_id);

    const uniqueEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!uniqueEmployee) {
      return NextResponse.json({ error: "Can't found employee" });
    }

    const eventAttendee = await prisma.eventAttendee.findFirst({
      where: {
        event_id: eventId,
        employee_id: employeeId,
      },
    });

    if (eventAttendee) {
      return NextResponse.json({ error: 'Already registered!' });
    }

    const newEventAttendee = await prisma.eventAttendee.create({
      data: {
        employee: { connect: { id: employeeId } },
        event: { connect: { id: eventId } },
      },
    });
    console.log(newEventAttendee);
    return NextResponse.json(newEventAttendee);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Failed to register"});
  }
}
