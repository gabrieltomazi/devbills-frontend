import { useEffect } from "react";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/authContext";

export default function LoginPage() {

  const navigate = useNavigate()

  const { signWithGoogle, authState } = useAuth();

  const handleLogin = async () => {
    try {
      await signWithGoogle();
    } catch (error) {
      console.error("Erro ao fazer login com o Google", error)
    }
  }

  useEffect(() => {
    if (authState.user && !authState.loading) {
      navigate("/dashboard")
    }
  }, [authState.user, authState.loading, navigate])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-[30px]">DevBills</h1>
          <p className="font-normal text-[14px]">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </div>

        <div className="bg-gray-800 shadow-2xl rounded-lg px-10 py-8">
          <form action="">
            <h2 className="font-medium text-[18px]">Faça login para continuar</h2>
            <p className="font-medium text-[14px] opacity-60 mb-8">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
            <GoogleLoginButton
              isLoading={false}
              onClick={handleLogin} />

            {authState.error && (
              <div className="bg-red-50 text-center rounded-lg text-red-700 mt-4">
                <p>{authState.error} Erro no sistema</p>
              </div>
            )}

            <footer className="mt-6">
              <p className="text-[12px] text-center opacity-60 ">
                Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </footer>
          </form>
        </div>
      </section>
    </main>
  );
}
