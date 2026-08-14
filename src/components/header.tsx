import { Activity, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/authContext";

interface NavLink {
  name: string;
  path: string;

}

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { authState, signOut } = useAuth();
  const { pathname } = useLocation();

  const isAuthenticated = !!authState.user;

  const navLink: NavLink[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" }
  ]

  const handleSignOut = (): void => {
    signOut();
  }

  const renderAvatar = () => {
    if (!authState.user) return null

    if (authState.user.photoUrl) {
      <img
        src={authState.user.photoUrl}
        alt={`Foto de perfil de ${authState.user.displayName}`}
        className="w-8 h-8 rounded-full border border-gray-700"
      />
    }

    return (
      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
        {authState.user.displayName.charAt(0)}
      </div>
    )

  }

  return (
    <>
      <header className="bg-gray-900 flex justify-between container-app py-4 w-full border-gray-700 overflow-hidden">

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
            <img src={authState.user.photoUrl} alt="users-photo" />
          </div>
          <p className="mr-4">{authState.user.displayName}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="p-2 rounded-full "
          >
            <LogOut className="text-red-500 cursor-pointer" />
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