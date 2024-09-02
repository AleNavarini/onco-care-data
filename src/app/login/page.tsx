'use client';
import * as React from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Logo from '@/components/common/logo';
import ThemeToggle from '@/components/theme-toggle';

type FormValues = {
  email: string;
  password: string;
};

export default function JoySignInSideTemplate() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-1/2 flex flex-col">
        <header className="w-full flex justify-between items-center px-7 py-3">
          <Logo />
          <ThemeToggle />
        </header>
        <main className="flex flex-col items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Comencemos! Por favor ingresa tus credenciales.
            </p>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <Input
                  {...register('email', { required: true })}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Log in
            </button>
          </form>
        </main>
        <footer className="py-4">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © Onco-Care-Data {new Date().getFullYear()}
          </p>
        </footer>
      </div>
      <div className="w-1/2 h-full relative">
        <Image
          src={
            'https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2'
          }
          alt={'Login Image just decorative'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
}
