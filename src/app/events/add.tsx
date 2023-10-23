"use client";
import { useState } from "react";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import { TeventSchema, eventSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function AddEvent() {
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
  } = useForm<TeventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: TeventSchema) => {
    const response = await fetch("/api/server/addEvent", {
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
    toast.success("Successfully created a new event!");
    closeModal();
    router.refresh();
    return;
  };

  return (
    <div className="AddEvent">
      <button onClick={openModal} className="btn btn-primary">
        Add Event
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <h1 className="text-center font-bold">ADD EVENT</h1>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="input input-solid max-w-full"
              {...register("name")}
              required
            />
            {errors.name && (
              <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              placeholder="date"
              className="input input-solid max-w-full"
              {...register("date")}
              required
            />
            {errors.date && (
              <p className="text-red-500">{`${errors.date.message}`}</p>
            )}
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              className="select select-solid max-w-full"
              id="status"
              defaultValue="PLANNED"
              required
              {...register("status")}
            >
              <option value="PLANNED">PLANNED</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              disabled={isSubmitting}
              type="submit"
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
    </div>
  );
}

export default AddEvent;
