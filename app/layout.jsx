import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "find the perfect rental property",
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastProvider />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
