"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema, TUserSchema } from "../../lib/types";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: TUserSchema) => {
    const response = await fetch("/api/server/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.errorMessage) {
      const error = responseData.errorMessage;
      return error;
    }

    return responseData;
  };

  return (
    <div className="card p-5">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <h1 className="text-center font-bold">REGISTER</h1>
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
          placeholder="Password"
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
          <option value="SCANNER">SCANNER</option>
        </select>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="btn btn-primary max-w-full"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
