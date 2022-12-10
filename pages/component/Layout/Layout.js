import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
// import { useSession } from "next-auth/client";
import { Button } from "@chakra-ui/react";
// # components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
//  import DevicesSidebar from "./DevicesSidebar";
//  import PageLoader from "@/components/common/PageLoader";
//  import CustomizationLayout from "@/components/customization/layout/CustomizationLayout";
//  import DevicesLayout from "@/components/customization/layout/DevicesLayout";
//  import OrgTreeSidebar from "./OrgTreeSidebar";

const Layout = (props) => {
  const router = useRouter();
  const { pathname, asPath } = router;

  const { children } = props;

  //   const [session, loading] = useSession();

  //   useEffect(() => {
  //     const isHistory = Cookies.get("history");
  //     if (pathname !== "/") {
  //       Cookies.set("history", asPath);
  //     }

  //     if (pathname === "/" && session && isHistory) {
  //       router.push(isHistory);
  //     }

  //     if (pathname !== "/" && !session && !loading) {
  //       router.replace("/");
  //     }
  //   }, [router.components, loading, session]);

  // loading component
  //   if (
  //     loading ||
  //     (pathname === "/" && !loading && session) ||
  //     (pathname !== "/" && !loading && !session)
  //   ) {
  //     return <PageLoader />;
  //   }

  if (pathname === "/") {
    return (
      <div className="min-w-full flex flex-col min-h-screen">{children}</div>
    );
  }

  return <AuthLayout>{children}</AuthLayout>;
};

// common layout for all pages
const AuthLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
