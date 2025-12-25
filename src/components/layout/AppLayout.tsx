import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout
