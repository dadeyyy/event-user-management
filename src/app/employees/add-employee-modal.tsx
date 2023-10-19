"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { TEmployeeSchema, employeeSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      "http://localhost:3000/api/server/addEmployee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    toast.success("Successfully created a new employee!");
    closeModal();
    router.refresh();
    return;
  };

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              className="input input-solid max-w-full"
              {...register("lastName")}
              required
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
              className="input input-solid max-w-full"
              {...register("firstName")}
              required
            />
            {errors.firstName && (
              <p className="text-red-500">{`${errors.firstName.message}`}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="extName">ExtName:</label>
            <input
              id="extName"
              type="text"
              placeholder="Extended Name"
              className="input input-solid max-w-full"
              {...register("extName")}
            />
            {errors.extName && (
              <p className="text-red-500">{`${errors.extName.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="middleName">Middle Name:</label>
            <input
              id="middleName"
              type="text"
              placeholder="Middle Name"
              className="input input-solid max-w-full"
              {...register("middleName")}
            />
            {errors.middleName && (
              <p className="text-red-500">{`${errors.middleName.message}`}</p>
            )}
          </div>
        </div>

        <div className="grid grid-col-1">
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            placeholder="Position"
            className="input input-solid max-w-full"
            {...register("position")}
            required
          />
          {errors.position && (
            <p className="text-red-500">{`${errors.position.message}`}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="office">Office:</label>
            <input
              id="office"
              type="text"
              placeholder="Office"
              className="input input-solid max-w-full"
              {...register("office")}
              required
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
              className="input input-solid max-w-full"
              {...register("officeAssignment")}
              required
            />
            {errors.officeAssignment && (
              <p className="text-red-500">{`${errors.officeAssignment.message}`}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="detailed">Detailed: </label>
            <select
              className="select select-solid max-w-full"
              id="detailed"
              defaultValue="true"
              {...register("detailed")}
            >
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
              className="input input-solid max-w-full"
              {...register("role")}
              required
            />
            {errors.role && (
              <p className="text-red-500">{`${errors.role.message}`}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row w-full gap-1">
          <button
            disabled={isSubmitting}
            onClick={() => {
              console.log("hi");
            }}
            // type="submit"
            className="btn btn-primary w-full disabled:bg-gray-400"
          >
            Add
          </button>
          <button onClick={closeModal} className="btn btn-error w-full">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AddEmployeeModal;
