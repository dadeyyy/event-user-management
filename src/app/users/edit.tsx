'use client';
import { useState } from 'react';
import Modal from '@/components/modal';
import { useForm } from 'react-hook-form';
import { TUserSchema, userSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import { User } from '@prisma/client';


type EditUserProps = {
  user: User
}


function EditUser({user}: EditUserProps) {
  //modal state
  const router = useRouter()
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
    formState: { errors, isSubmitting, isLoading },
    reset,
    setError,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: TUserSchema) => {
    const response = await fetch('/api/server/editUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.error) {
      const { error } = responseData;
      console.log(error);
      toast.error(`${error}`);
      return;
    }
        toast.success("Successfully created a new user!")
        closeModal()
        router.refresh()
        return
  };

  return (
    <div className="AddUser">
      <button onClick={openModal} >
        Edit User
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
            defaultValue={user.username}
              id="username"
              type="text"
              placeholder="Username"
              className="px-4 py-2 rounded"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500">{`${errors.username.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              className="px-4 py-2 rounded"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              defaultValue={user.email}
              id="email"
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded ml-10"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select id="role" defaultValue={user.role} {...register('role')}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
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

export default EditUser;
