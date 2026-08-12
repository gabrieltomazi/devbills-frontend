import { Activity, LogOut } from "lucide-react";
import { Link } from "react-router";



export default function Header() {

  return (
    <>
      <header className="flex justify-between container-app py-4 w-full bg-gray-900 overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Activity className="text-primary-500" />
          <p className="font-bold text-[20px] text-primary-500">DevBills</p>
        </div>

        {/* Botões principais */}
        <nav className="gap-4 hidden sm:flex">
          <Link to={"/dashboard"} className="bg-primary-500/10 text-primary-500 py-2 px-3">Dashboard</Link>
          <Link to={"/transacoes"} className="bg-transparent text-primary-500 py-2 px-3">Transações</Link>
        </nav>


        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
            <img src="https://github.com/gabrieltomazi.png" alt="users-photo" />
          </div>
          <p className="mr-4">Gabriel Tomazi</p>
          <button type="button" className="cursor-pointer">
            <LogOut className="text-red-500" />
          </button >
        </div>


      </header>

      <section className="flex sm:hidden mx-auto py-2">
        <nav className="flex flex-row gap-4">
          <Link to={"/dashboard"} className="bg-primary-500/10 text-primary-500 py-2 px-3">Dashboard</Link>
          <Link to={"/transacoes"} className="bg-transparent text-primary-500 py-2 px-3">Transações</Link>
        </nav>
      </section>
    </>
  )

}