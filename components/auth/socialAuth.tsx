'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { DividerWithText } from '../misc/dividerWithText';
import { Button } from '../ui/button';

type SocialAuthProps = {
  type?: 'Login' | 'Signup';
};

export const SocialAuth = ({ type }: SocialAuthProps) => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'X') => {
    signIn(provider, {
      callbackUrl: callbackURL || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='grid gap-4'>
      <DividerWithText text='or' className='mt-4' />
      <Button
        variant='outline'
        className='w-full'
        onClick={() => onClick('google')}
      >
        {type} with Google
      </Button>
      {/* <Button variant='outline' className='w-full'>
        {type} with Microsoft
      </Button> */}
    </div>
  );
};
