import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      {/* Fondo fijo */}
      <div className="bg-fixed fixed inset-0 w-full h-full bg-black dark:bg-neutral-900" />

      {/* Contenedor principal */}
      <div className="relative flex flex-col min-h-[100dvh] text-neutral-900 dark:text-neutral-100 animate__animated animate__fadeIn
        overflow-x-auto
      ">
        <Header />

        <main className="flex-1 px-4 py-8 overflow-y-auto pb-safe">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
