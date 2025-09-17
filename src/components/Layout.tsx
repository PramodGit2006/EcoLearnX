import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecolearn-theme">
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;