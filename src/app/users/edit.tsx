"use client";
import { useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { TUserSchema, userSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

type EditUserProps = {
  user: User;
};

function EditUser({ user }: EditUserProps) {
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
    const response = await fetch("/api/server/editUser", {
      method: "PUT",
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
      <button className="badge badge-flat-success" onClick={openModal}>
        Edit User
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <h1 className="text-center font-bold">EDIT USER</h1>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              defaultValue={user.username}
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

          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              defaultValue={user.email}
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

          <div className="flex flex-col">
            <label htmlFor="role">Role</label>
            <select className="select select-solid max-w-full" id="role" defaultValue={user.role} {...register("role")}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex flex-row w-full gap-1 mt-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary w-full disabled:bg-gray-400"
          >
            Save
          </button>

          <button
          onClick={closeModal}
          className="btn btn-error w-full"
        >
          Close
        </button>
        </div>
        </form>

       
      </Modal>
    </div>
  );
}

export default EditUser;
