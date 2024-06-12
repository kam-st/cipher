import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import NavBreadcrums from "@/components/nav-breadcrums";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <ContentLayout title="Server">
      <NavBreadcrums
        homeElement={"Home"}
        activeClasses="font-semibold"
        capitalizeLinks
      />

      {children}
      {/* <PlaceholderContent /> */}
    </ContentLayout>
  );
};

export default PageLayout;
