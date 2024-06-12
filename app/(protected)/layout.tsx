import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';

import Navbar from './_components/navbar';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <AdminPanelLayout>
      {/* <Navbar /> */}
      {children}
      </AdminPanelLayout>
  );
};

export default ProtectedLayout;
