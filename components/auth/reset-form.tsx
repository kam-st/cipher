'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { resetPasswordAction } from '@/actions/reset-password-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResetSchema } from '@/lib/validations/auth';

import { FormError } from './form-error';
import { FormSucess } from './form-sucess';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';


export function ResetForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSucess('');
    startTransition(() => {
      resetPasswordAction(values).then((data) => {
        setError(data?.error);
        setSucess(data?.success);
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type='email'
                      placeholder='john.doe@example.com'
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Send reset email {isPending ? '...' : ''}
          </Button>
        </form>
      </Form>
    </>
  );
}
