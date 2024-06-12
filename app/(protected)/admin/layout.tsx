import { ContentLayout } from "@/components/admin-panel/content-layout";
import NavBreadcrums from "@/components/nav-breadcrums";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <ContentLayout title="Admin">
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
