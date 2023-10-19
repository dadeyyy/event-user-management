'use client';
import { useState } from 'react';
import Modal from '@/components/modal';
import { useForm } from 'react-hook-form';
import { TeventSchema, eventSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {Event} from "@prisma/client"

type EditEventProps= {
    event: Event
}

function AddEvent({event}:EditEventProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TeventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: TeventSchema) => {
    
    const response = await fetch('/api/server/editEvent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        id: event.id
      }),
    });
    const responseData = await response.json();
    console.log(responseData)

    if (responseData.error) {
      const { error } = responseData;
      toast.error(`${error}`);
      return;
    }
    toast.success('Successfully edited user!');
    closeModal();
    router.refresh();
    return;
  };

  return (
    <div className="EditEvent">
      <button onClick={openModal} >
        Edit
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <label htmlFor="username">Name</label>
            <input
              defaultValue={event.name}
              id="name"
              type="text"
              placeholder="Name"
              className="px-4 py-2 rounded"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input
              defaultValue={event.date.toString()}
              id="date"
              type="date"
              placeholder="date"
              className="px-4 py-2 rounded"
              {...register('date')}
            />
            {errors.date && (
              <p className="text-red-500">{`${errors.date.message}`}</p>
            )}
          </div>
          

          <div>
            <label htmlFor="status">Status</label>
            <select id="status" defaultValue={event.status} {...register('status')}>
              <option value="PLANNED">PLANNED</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
          >
            Submit
          </button>
        </form>

        <button
          onClick={closeModal}
          className="bg-gray-300 text-gray-700 px-3 py-1 mt-4"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

export default AddEvent;
