import Link from 'next/link';

import NewPaswordForm from '@/components/auth/new-password-form';
import { Icons } from '@/components/misc/icons';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const NewPasswordPage = () => {
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
          <CardTitle className='flex justify-center text-2xl'>
            Reset password
          </CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <NewPaswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPasswordPage;
