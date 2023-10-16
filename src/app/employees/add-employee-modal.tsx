'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TEmployeeSchema, employeeSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type AddEmployeeProps = {
  closeModal: () => void;
  open: boolean;
};

const AddEmployeeModal = ({ closeModal, open }: AddEmployeeProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<TEmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: TEmployeeSchema) => {
 

    const response = await fetch(
      'http://localhost:3000/api/server/addEmployee',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    
    console.log(responseData);
    if (responseData.error) {
      const { error } = responseData;
      console.log(error);
      toast.error(`${error}`);
      return;
    }
    toast.success('Successfully created a new employee!');
    closeModal();
    router.refresh();
    return;
  };

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="px-4 py-2 rounded"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-red-500">{`${errors.lastName.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className="px-4 py-2 rounded"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-red-500">{`${errors.firstName.message}`}</p>
          )}
        </div>
        <div>
          <label htmlFor="extName">ExtName:</label>
          <input
            id="extName"
            type="text"
            placeholder="Extended Name"
            className="px-4 py-2 rounded ml-10"
            {...register('extName')}
          />
          {errors.extName && (
            <p className="text-red-500">{`${errors.extName.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            placeholder="Position"
            className="px-4 py-2 rounded ml-10"
            {...register('position')}
          />
          {errors.position && (
            <p className="text-red-500">{`${errors.position.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="middleName">Middle Name:</label>
          <input
            id="middleName"
            type="text"
            placeholder="Middle Name"
            className="px-4 py-2 rounded ml-10"
            {...register('middleName')}
          />
          {errors.middleName && (
            <p className="text-red-500">{`${errors.middleName.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="office">Office:</label>
          <input
            id="office"
            type="text"
            placeholder="Office"
            className="px-4 py-2 rounded ml-10"
            {...register('office')}
          />
          {errors.office && (
            <p className="text-red-500">{`${errors.office.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="officeAssignment">Office Assignment:</label>
          <input
            id="officeAssignment"
            type="text"
            placeholder="Office Assignment"
            className="px-4 py-2 rounded ml-10"
            {...register('officeAssignment')}
          />
          {errors.officeAssignment && (
            <p className="text-red-500">{`${errors.officeAssignment.message}`}</p>
          )}
        </div>

        <div>
          <label htmlFor="detailed">Detailed: </label>
          <select id="detailed" defaultValue="true" {...register('detailed')}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <input
            id="role"
            type="text"
            placeholder="Role"
            className="px-4 py-2 rounded ml-10"
            {...register('role')}
          />
          {errors.role && (
            <p className="text-red-500">{`${errors.role.message}`}</p>
          )}
        </div>


        <button
          disabled={isSubmitting}
          onClick={() => {
            console.log('hi');
          }}
          // type="submit"
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
  );
};
export default AddEmployeeModal;
