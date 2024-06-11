'use client';

import React, { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { UserInfo } from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';


const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label='Client Component' />;
};

export default ClientPage;
