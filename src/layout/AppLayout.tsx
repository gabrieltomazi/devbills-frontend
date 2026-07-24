import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";


export default function AppLayout() {

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="grow py-6">
        <Outlet />
      </main>
      <Footer />
    </div>

  )

}