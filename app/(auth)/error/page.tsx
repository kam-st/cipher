import React from 'react';

import Link from 'next/link';

import { ErrorCard } from '@/components/auth/errorCard';
import { Icons } from '@/components/misc/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AuthErrorPage = () => {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Back
        </>
      </Link>
      <ErrorCard />
    </div>
  );
};

export default AuthErrorPage;
