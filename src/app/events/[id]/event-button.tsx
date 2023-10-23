'use client';
import React, { useEffect, useState } from 'react';
import { EventStatus } from '@prisma/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type EventButtonProps = {
  eventID: number;
  status: EventStatus;
};

export default function EventButton({ status, eventID }: EventButtonProps) {
  const router = useRouter();
  const [eventStatus, setEventStatus] = useState(status);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const response = await fetch('/api/server/changeStatus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: eventID,
        status: eventStatus, // Use the current eventStatus, not the prop status
        value: value,
      }),
    });

    const responseData = await response.json();
    if (responseData && responseData.status) {
      setEventStatus(responseData.status);
      toast.success(responseData.message);
      router.refresh();
    } else if (responseData.error) {
      console.log(responseData.error);
      toast.error('Status cannot be changed');
    }
  };

  if (eventStatus === 'PLANNED') {
    return (
      <div className=' flex gap-2'>
        <button
          className="btn btn-primary"
          value="start"
          onClick={onClickHandler}
        >
          Start
        </button>
        <button
          className="btn"
          value="cancel"
          onClick={onClickHandler}
        >
          Cancel
        </button>
      </div>
    );
  } else if (eventStatus === 'ONGOING') {
    return (
      <div className='flex gap-2'>
        <button
          className="btn btn-error"
          value="stop"
          onClick={onClickHandler}
        >
          Stop
        </button>
        <button
          className="btn"
          value="cancel"
          onClick={onClickHandler}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          value="done"
          onClick={onClickHandler}
        >
          Done
        </button>
      </div>
    );
  } else if (eventStatus === 'CANCELLED') {
    return (
      <div>
        <button
          className="btn btn-primary"
          value="start"
          onClick={onClickHandler}
        >
          Start
        </button>
      </div>
    );
  } else if (eventStatus === 'COMPLETED') {
    return <h1 className='badge badge-success'>COMPLETED</h1>;
  }
  else{
    return <h1>Can't return anything!</h1>
  }
}
