'use client';
import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TEmployeeSchema, employeeSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import AddEmployeeModal from './add-employee-modal';

export const metadata: Metadata = {
  title: 'Employees',
};

function AddEmployee() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="AddEmployee">
      <button onClick={openModal} className="bg-blue-500 text-white p-2">
        Add Employee
      </button>

      <AddEmployeeModal closeModal={closeModal} open={isModalOpen} />
    </div>
  );
}

export default AddEmployee;
