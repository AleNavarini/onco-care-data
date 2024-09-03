'use client';
import PasswordChangeForm from '@/components/forms/password-change-form';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useUser from '@/hooks/use-user';

export default function ProfilePage() {
  const user = useUser();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-6">Mi Perfil</h1>
      <div className="w-60 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold pb-1">Nombre</p>
          <Input value={user?.name?.toString()} />
        </div>
        <div>
          <p className="text-sm font-semibold pb-1">Mail</p>
          <Input value={user?.email?.toString()} />
        </div>
        <PasswordChangeForm />
      </div>
    </div>
  );
}
