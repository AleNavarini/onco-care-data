'use client';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Logo from '@/components/common/logo';
import ThemeToggle from '@/components/theme-toggle';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

type FormValues = {
  email: string;
  password: string;
};

export default function JoySignInSideTemplate() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="flex flex-col w-full h-screen md:w-1/2">
        <header className="flex items-center justify-between w-full py-3 px-7">
          <Logo />
          <ThemeToggle />
        </header>
        <main className="flex flex-col items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="mb-4 text-2xl font-bold">Bienvenido de vuelta</h2>
            <p className="mb-8 font-extralight">
              Comencemos! Por favor ingresa tus credenciales.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
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
                  className="block text-sm font-medium "
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
            <Button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 mt-6 "
            >
              {isSubmitting ? <Spinner /> : 'Log in'}
            </Button>
          </form>
        </main>
        <footer className="py-4">
          <p className="text-xs text-center ">
            © Onco-Care-Data {new Date().getFullYear()}
          </p>
        </footer>
      </div>
      <div className="relative hidden h-full md:block md:w-1/2">
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
