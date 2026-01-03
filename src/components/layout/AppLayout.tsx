import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh flex flex-col overflow-x-hidden bg-gray-100 dark:bg-neutral-900
        text-neutral-900 dark:text-neutral-100 animate__animated animate__fadeIn ">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout
