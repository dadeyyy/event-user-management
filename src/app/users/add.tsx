"use client";
import { useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { TUserSchema, userSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function AddUser() {
  //modal state
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
    formState: { errors, isSubmitting, isLoading },
    reset,
    setError,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: TUserSchema) => {
    const response = await fetch("/api/server/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      <button onClick={openModal} className="btn btn-primary">
        Add User
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <h1 className="text-center font-bold">ADD USER</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input input-solid max-w-full"
              {...register("username")}
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
              className="input input-solid max-w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="input input-solid max-w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              className="select select-solid max-w-full"
              id="role"
              defaultValue="USER"
              {...register("role")}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary max-w-full disabled:bg-gray-300"
          >
            Add
          </button>
          <button onClick={closeModal} className="btn btn-error btn-sm w-1/5">
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AddUser;
