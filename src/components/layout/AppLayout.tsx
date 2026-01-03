import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="bg-full text-neutral-900 dark:text-neutral-100 animate__animated animate__fadeIn">
      {/* Header siempre arriba */}
      <Header />

      {/* Contenido principal con padding y scroll interno si hace falta */}
      <main className="flex-1 px-4 py-8 overflow-auto pb-safe">
        {children}
      </main>

      {/* Footer siempre al final */}
      <Footer />
    </div>
  );
};

export default AppLayout;
