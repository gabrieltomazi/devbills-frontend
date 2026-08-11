import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import MonthYearSelect from "../components/MonthYearSelect";
import getTransactions from "../services/transactionsService";
import type { Transaction } from "../types/transactions.types";


export default function Transactions() {

  const currentDate = new Date();

  // Mêses aqui começam em 0, adiciono o +1 para começar em janeiro
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const data = await getTransactions({ month, year });

      console.log(data)
      setTransactions(data)


    } catch (err) {
      setError("Não foi possível carregar as transações, tente novamente!");


    } finally {
      setLoading(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions();
  }, [month, year])

  return (
    <main className="px-4 md:px-20 2xl:px-80 space-y-5" >

      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <h2 className="font-bold text-2xl items-center">Transações</h2>
        <Link to={"/transacoes/nova"} className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center
        hover:bg-primary-600 transition-all">
          <Plus className="w-5 h-5" />
          Nova Transação
        </Link>
      </div>

      <Card className="mb-6">
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </Card>

      <Card className="mb-6">
        <Input
          error={error}
          placeholder="Buscar transações..."
          icon={<Search className="w-4 h-4" />}
          fullWidth
        />
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p>{error}</p>
            <Button onClick={fetchTransactions} className="mx-auto mt-6">Tentar novamente!</Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma transação encontrada.</p>
            <Link
              to={"/transacoes/nova"}
              className="w-fit mx-auto mt-4 bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center
        hover:bg-primary-600 transition-all">
              <Plus className="w-5 h-5 " />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div>
            Olá
          </div>
        )}
      </Card>


    </main>
  )

}