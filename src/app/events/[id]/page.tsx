import prisma from "@/lib/prisma";
import EventButton from "./event-button";
import Link from "next/link";

export default async function EventQR({
  params,
  searchParams,
}: {
  params: { id: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = parseInt(params.id);

  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });
  const eventAttendee = await prisma.eventAttendee.findMany({
    where: {
      event_id: id,
    },
    include: {
      employee: true,
      event: true,
    },
  });

  if (eventAttendee) {
    return (
      <div className="w-full h-screen p-4">
        <div>
          {event && (
            <div>
              <div className="flex flex-col-reverse w-full p-3">
                <div>
                  <ul className="text-center justify-center">
                    <h1 className="text-center font-bold">Event Details</h1>
                    <li>
                      <span>Event ID: </span>
                      {event.id}
                    </li>
                    <li>
                      <span>Event Name: </span>
                      {event.name}
                    </li>
                    <li>
                      <span>Event Date: </span>
                      {event.date.toString()}
                    </li>
                    <li>
                      <span>Event Status: </span>
                      {event.status}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <EventButton eventID={event.id} status={event.status} />
                  </div>
                  <div>
                    <Link href={`/events/${event.id}/scanner`}>
                      <span className="btn bg-gray-300 font-bold gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                          />
                        </svg>
                        Scan
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full overflow-x-auto">
          <table className="table-hover table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Last Name</th>
                <th>First Name</th>
              </tr>
            </thead>
            <tbody>
              {eventAttendee.map((eventAttendee) => (
                <tr key={eventAttendee.employee_id}>
                  <td>{eventAttendee.employee.id}</td>
                  <td>{eventAttendee.employee.lastName}</td>
                  <td>{eventAttendee.employee.firstName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return <h1>No Event Attendees</h1>;
}
