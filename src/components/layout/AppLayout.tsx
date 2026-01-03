import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <div className="bg-fixed" />

      <div className="relative flex flex-col min-h-screen text-neutral-900 dark:text-neutral-100 animate__animated animate__fadeIn">
        <Header />

        <main className="flex-1 px-4 py-8 overflow-auto pb-safe">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
