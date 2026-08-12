import { AlertCircle, ArrowDown, ArrowUp, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import MonthYearSelect from "../components/MonthYearSelect";
import getTransactions, { deleteTransaction } from "../services/transactionsService";
import { type Transaction, TransactionType, } from "../types/transactions.types";
import { formatCurrency, formatDate } from "../utils/formatters";


export default function Transactions() {

  const currentDate = new Date();

  // Mêses aqui começam em 0, adiciono o +1 para começar em janeiro
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchText.toLowerCase())
  );


  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const data = await getTransactions({ month, year });

      console.log(data)
      setTransactions(data)


    } catch (err) {
      setError("Não foi possível carregar as transações, tente novamente!");
      console.error(`Error: ${err}`)

    } finally {
      setLoading(false)
    }
  };

  const handleDelete = async (id: string): Promise<void> => {

    try {
      setDeletingId(id);
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
      toast.success("Transação deletada com sucesso!");
    } catch (err) {
      setError(`Error: ${err}`);
      console.error(err);
      toast.error("Falha ao deletar transação");
    } finally {
      setDeletingId("");
    }
  };

  const confirmDelete = (id: string): void => {
    if (window.confirm("Tem certeza que deseja deletar essa transação?")) {
      handleDelete(id)
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  }


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions();
  }, [month, year])

  return (
    <main className="container-app space-y-5 min-w-screen" >

      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <h2 className="font-bold text-2xl items-center">Transações</h2>
        <Link to={"/transacoes/nova"} className="bg-primary-500 text-gray-900 font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center
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
          onChange={handleSearchChange}
          value={searchText}
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
              className="w-fit mx-auto mt-4 bg-primary-500 text-gray-900 font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center
        hover:bg-primary-600 transition-all">
              <Plus className="w-5 h-5 " />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full w-full">
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Descrição
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Data
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Categoria
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Valor
                  </th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    {""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {transaction.type === TransactionType.INCOME
                            ? <ArrowUp className="w-4 h-4 text-primary-500" />
                            : <ArrowDown className="w-4 h-4 text-red-500" />}
                        </div>
                        <span className="font-medium text-gray-50">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: transaction.category.color }} />
                        <span className="text-sm text-gray-400">{transaction.category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-red-500 hover:text-red-400 rounded-full cursor-pointer"
                        type="button"
                        disabled={deletingId === transaction.id}
                        onClick={() => confirmDelete(transaction.id)}
                      >
                        {deletingId === transaction.id
                          ? <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          : <Trash2 className="w-4 h-4" />
                        }
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>


    </main>
  )

}