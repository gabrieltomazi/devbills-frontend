import { CreditCard, List, TrendingUp, Wallet } from "lucide-react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import Button from "../components/button";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function Home() {


  const navigate = useNavigate();

  const features: ReadonlyArray<Feature> = [
    {
      icon: <Wallet className="w-8 h-8 text-primary-700" />,
      title: "Controle Financeiro",
      description:
        "Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-700" />,
      title: "Relatórios",
      description: "Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
    },
    {
      icon: <List className="w-8 h-8 text-primary-700" />,
      title: "Categorias Personalizadas",
      description: "Organize suas transações em categorias para melhor análise.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-700" />,
      title: "Transações Ilimitadas",
      description:
        "Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.",
    },
  ];

  return (
    <main className="bg-gray-950 min-h-screen px-4 lg:px-20 pt-20">
      <div>
        <h1 className="font-bold text-4xl mb-6 sm:max-w-[50%]">
          Gerencie suas finanças com o <span className="text-primary-500">DevBills</span>
        </h1>
        <p className="mb-8 sm:max-w-[50%] lg:max-w-150">
          Uma plataforma simples e eficiente para controlar suas despesas e receitas. Organize suas
          finanças pessoais ou do seu negócio com facilidade.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>Começar agora</Button>
      </div>

      <div className="mt-25 pt-12 px-4 bg-gray-900 rounded-xl">
        <h2 className="text-center text-[30px] font-bold">Recursos do DevBills</h2>
        <p className="text-center pb-12">
          Nossa plataforma oferece tudo o que você precisa para manter suas finanças organizadas.
        </p>

        <section className="grid justify-center justify-items-center w-full md:grid-cols-2 gap-8 lg:grid-cols-4 pb-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl h-75 border border-gray-600 bg-gray-800 hover:shadow-2xl duration-300 pt-9.25 pb-6 px-6 max-w-75 mx-auto md:w-full"
            >
              {feature.icon}
              <h3 className="font-semibold mt-8.5 mb-2 text-[20px]">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>

      <section className="py-12 px-6 md:py-20 my-20 bg-gray-900 border border-gray-600 rounded-xl">
        <div className="flex items-center flex-col gap-6 text-center">
          <h2 className="font-bold text-[30px]">Pronto para organizar suas finanças?</h2>
          <p className="font-normal text-[16px]">
            Comece a usar o DevBills hoje mesmo e tenha o controle total sobre seu dinheiro. É
            gratuito e fácil de usar!
          </p>
          <Button onClick={() => navigate('/login')}>Criar Conta Gratuita</Button>
        </div>
      </section>

      <hr />

      <div className="text-center md:text-start my-8">
        <h2 className="text-green-500 ">DevBills</h2>
        <p>© 2025 - Todos os direitos reservados</p>
      </div>
    </main>
  );
}
