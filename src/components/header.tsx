import { Activity, LogOut } from "lucide-react";
import Button from "./button";



export default function Header() {

  return (
    <>
      <main className="flex justify-between w-full bg-gray-900 p-4 md:px-20 2xl:px-80 overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Activity className="text-primary-500" />
          <p className="font-bold text-[20px] text-primary-500">DevBills</p>
        </div>

        {/* Botões principais */}
        <div className="gap-4 hidden sm:flex">
          <Button className="bg-primary-500/10 text-primary-500 py-2 px-3 ">Dashboard</Button>
          <Button variant="secondary" className="bg-transparent">Transações</Button>
        </div>


        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
            <img src="https://github.com/gabrieltomazi.png" alt="users-photo" />
          </div>
          <p className="mr-4">Gabriel Tomazi</p>
          <button type="button" className="cursor-pointer">
            <LogOut className="text-red-500" />
          </button >
        </div>


      </main>

      <section className="flex sm:hidden mx-auto py-2">
        <div className="flex flex-row gap-4">
          <Button className="bg-primary-500/10 text-primary-500 py-2 px-3 ">Dashboard</Button>
          <Button variant="secondary" className="bg-transparent">Transações</Button>
        </div>
      </section>
    </>
  )

}