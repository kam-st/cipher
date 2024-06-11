import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '../ui/button';

export const ErrorCard = () => {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Auth</CardTitle>
        <CardDescription>Oops! Something went wrong!</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className='w-full'>Back to Login</Button>
      </CardContent>
    </Card>
  );
};
