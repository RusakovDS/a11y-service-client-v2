import { Outlet } from "react-router-dom";
import ContentLayout from "./ContentLayout";
import { Footer } from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ContentLayout>
        <Outlet />
      </ContentLayout>
      <Footer />
    </div>
  );
};

export default Layout;
