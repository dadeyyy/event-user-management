import prisma from '@/lib/prisma';
import { EventStatus } from '@prisma/client';
import { Event } from '@prisma/client';
import { NextResponse } from 'next/server';

type ResponseBody = {
  id: number;
  status: EventStatus;
  value?: string;
};

export const constraints = {
  start: ['PLANNED', 'CANCELLED'],
  stop: ['ONGOING'],
  cancel: ['PLANNED', 'ONGOING'],
  done: ['ONGOING'],
};

const changeEventStatus = (event: Event, status: EventStatus) => {
  const updatedStatus = prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      ...event,
      status: status,
    },
  });

  return updatedStatus;
};

export async function PUT(request: Request) {
  const body: ResponseBody = await request.json();
  const { id, status, value } = body;
  //FIND EVENT
  const eventStatus = await prisma.event.findUnique({
    where: {
      id: id,
      status: status,
    },
  });

  if (eventStatus) {
    let statusVal;
    if (value === 'start' && constraints.start.includes(eventStatus.status)) {
      statusVal = await changeEventStatus(eventStatus, 'ONGOING');
    } else if (
      value === 'stop' &&
      constraints.stop.includes(eventStatus.status)
    ) {
      statusVal = await changeEventStatus(eventStatus, 'PLANNED');
    } else if (
      value === 'cancel' &&
      constraints.cancel.includes(eventStatus.status)
    ) {
      statusVal = await changeEventStatus(eventStatus, 'CANCELLED');
    } else if (
      value === 'done' &&
      constraints.done.includes(eventStatus.status)
    ) {
      statusVal = await changeEventStatus(eventStatus, 'COMPLETED');
    }

    if (statusVal && statusVal.status) {
      return NextResponse.json({
        message: `${eventStatus.status} updated to ${statusVal.status}`,
        status: statusVal.status
      });
    }
    return NextResponse.json({
      error: `Failed to update ${eventStatus.status}`,
    });
  }
  return NextResponse.json({ error: 'Event cannot found' });
}
