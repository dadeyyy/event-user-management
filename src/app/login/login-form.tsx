"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TLogInSchema, logInSchema } from "../../lib/types";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LogInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (data: TLogInSchema) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "http://localhost:3000/",
    });

    if (response && !response.ok) {
      toast.error("Invalid Username or Password!");
      reset();
      return;
    }

    toast.success("Logged In Successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="card mx-auto flex w-full max-w-sm flex-col gap-6 p-10 px-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-sm">Login to access your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="form-field">
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="type here"
                className="input input-ghost-primary max-w-full"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-xs ml-2 mt-1">{`${errors.username.message}`}</p>
              )}
            </div>
          </div>

          <div className="form-field">
            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="form-control flex flex-col">
                <input
                  id="password"
                  type="password"
                  placeholder="type here"
                  className="input input-ghost-primary max-w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs ml-2">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>
          </div>
          <div className="form-field pt-5">
            <div className="form-control justify-between">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary w-full"
              >
                {" "}
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-circle [--spinner-color:var(--slate-8)] spinner-sm"></div>
                    <span className="ml-2">Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
