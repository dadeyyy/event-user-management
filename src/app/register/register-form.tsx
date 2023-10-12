'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userSchema, TUserSchema } from '../../lib/types';




export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset,
    setError,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: TUserSchema) => {
    const response = await fetch('/api/server/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if(responseData.errorMessage){
      const error = responseData.errorMessage
      return error
    }

    return responseData
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
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded ml-10"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" defaultValue="USER" {...register('role')}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SCANNER">SCANNER</option>
        </select>
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
