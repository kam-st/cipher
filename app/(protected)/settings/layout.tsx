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
    <ContentLayout title="Settings">
      <NavBreadcrums
        homeElement={"Home"}
        activeClasses="font-medium"
        capitalizeLinks
      />

      <div className="mx-6">{children}</div>
      {/* <PlaceholderContent /> */}
    </ContentLayout>
  );
};

export default PageLayout;
