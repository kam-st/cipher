import React from 'react';

import { Icons } from '@/components/misc/icons';

type FormSucessProps = {
  message?: string;
};

export function FormSucess({ message }: FormSucessProps) {
  if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-emerald-500'>
      <Icons.check className='size-4' />
      <p>{message}</p>
    </div>
  );
}
