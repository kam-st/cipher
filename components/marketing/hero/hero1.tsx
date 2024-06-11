import React from 'react';

import Link from 'next/link';

import { LoginButton } from '@/components/auth/loginButton';
import { Button } from '@/components/ui/button';

const Hero1 = () => {
  return (
    <div className='text-center mt-16'>
      <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl'>
        <span className='block xl:inline'>Starter template built with </span>{' '}
        <span className='block text-orange-600 xl:inline'>
          NextJS . Drizzle . NextAuth
        </span>
      </h1>
      <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
        Starter template build with NextJS, drizzle, nextAuth, Shadcn, Tailwind.
      </p>
      <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4'>
        <LoginButton>
          <Button variant='secondary'>Get started</Button>
        </LoginButton>

        <Button variant='default'>
          <Link href='#'>Live demo</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero1;
