'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@/types';

import { FormError } from './form-error';

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permisions to view this content' />
    );
  }

  return <>{children}</>;
};
