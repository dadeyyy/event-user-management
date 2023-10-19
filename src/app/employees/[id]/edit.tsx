"use client";
import { useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { TEmployeeSchema, employeeSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Employee } from "@prisma/client";

type EditEmployeeProps = {
  employee: Employee;
};

function EditEmployee({ employee }: EditEmployeeProps) {

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
  } = useForm<TEmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: TEmployeeSchema) => {
    const response = await fetch("/api/server/editEmployee", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id: employee.id
      })
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.error) {
      const { error } = responseData;
      console.log(error);
      toast.error(`${error}`);
      return;
    }
    toast.success("Successfully created a new user!");
    closeModal();
    router.refresh();
    return;
  };

  return (
    <div className="AddUser">
      <button className="badge badge-flat-success" onClick={openModal}>
        Edit Employee
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
          defaultValue={employee.lastName}
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
            defaultValue={employee.firstName}
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
            defaultValue={employee.extName?.toString() || ""}
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
            defaultValue={employee.position}
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
            defaultValue={employee.middleName}
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
            defaultValue={employee.office}
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
            defaultValue={employee.officeAssignment}
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
          <select id="detailed" defaultValue={employee.detailed} {...register('detailed')}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <input
            defaultValue={employee.role}
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
            type="submit"
            className="btn btn-primary"
          >
           Edit Employee
          </button>

          <button
          onClick={closeModal}
          type="button"
          className="btn btn-error btn-sm w-1/5"
        >
          Close
        </button>
      </form>

       
      </Modal>
    </div>
  );
}

export default EditEmployee;
