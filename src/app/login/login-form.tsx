'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TLogInSchema, logInSchema } from '../../lib/types';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function LogInForm() {
  const router = useRouter()
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
    const response = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: 'http://localhost:3000',
    });
    
    
    if (response && !response.ok) {
      toast.error('Invalid Username or Password!');
      reset();
      return
    }

    toast.success("Logged In Successfully")
    router.push('/')
    router.refresh()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <div>
        <label htmlFor="username">Username</label>
        <input
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
