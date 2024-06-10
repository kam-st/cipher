'use client';

import { admin } from '@/actions/admin';
import { FormSucess } from '@/components/auth/form-sucess';
import { RoleGate } from '@/components/auth/role-gate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@/drizzle/schema';
import { useCurrentRole } from '@/hooks/use-current-role';

import { toast } from 'sonner';

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };

  const onAPIRouteClick = () => {
    fetch('api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route!');
      } else {
        toast.error('Forbidden API Route');
      }
    });
  };
  const role = useCurrentRole();
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.enumValues[0]}>
          <FormSucess message='You are allowed to view this content!' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={onAPIRouteClick}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
