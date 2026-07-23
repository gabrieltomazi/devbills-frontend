import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";


export default function PrivateRoutes() {

  const { authState } = useAuth();

  if (authState.loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!authState.user) {
    return <Navigate to={"/login"} replace />
  }

  return <Outlet />

}