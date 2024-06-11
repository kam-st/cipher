'use client';

import { DialogContent } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

import { LoginForm } from './loginForm';
import { Dialog, DialogTrigger } from '../ui/dialog';

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
};
