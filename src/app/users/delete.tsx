'use client';

import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/modal';
export type Tuser = {
  id: number;
};

export default function DeleteUser({ id }: Tuser) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnClick = async () => {
    const response = fetch('/api/server/deleteUser', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    const toasts = toast.promise(response, {
      loading: 'Loading',
      success: `Succcessfully Deleted!`,
      error: 'Failed to delete',
    });

    await toasts
    closeModal()
    router.refresh();

  };

  return (
    <>
      <button onClick={openModal}>Delete</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-y-2 ">
          <h1>Do you want to delete this user?</h1>

          <div >
            <button
              onClick={handleOnClick}
              className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
