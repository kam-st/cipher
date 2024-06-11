import React from 'react';

import Link from 'next/link';

import { RegisterForm } from '@/components/auth/register-form';
import { SocialAuth } from '@/components/auth/socialAuth';
import { DividerWithText } from '@/components/misc/dividerWithText';
import { Icons } from '@/components/misc/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';


const LoginPage = () => {
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
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          {/* <div className='grid gap-4'>
            <DividerWithText text='or' className='mt-4' />
            <Button variant='outline' className='w-full'>
              Sign up with Google
            </Button>
            <Button variant='outline' className='w-full'>
              Sign up with Microsoft
            </Button>
          </div> */}
          <SocialAuth type='Signup' />
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
