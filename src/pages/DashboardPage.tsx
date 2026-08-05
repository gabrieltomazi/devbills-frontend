import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "../components/card";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionSummary } from "../services/transactionsService";
import type { TransactionSummary } from "../types/transactions.types";
import { formatCurrency } from "../utils/formatters";


const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
}
export default function DashboardPage() {

  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
  const [year, setYear] = useState<number>(currentDate.getFullYear())
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary)

  useEffect(() => {
    async function loadTransactionsSummary() {

      const response = await getTransactionSummary(month, year);
      setSummary(response)
      console.log(response)
    }
    loadTransactionsSummary();
  }, [month, year])

  return (
    <main className="px-4 md:px-20 2xl:px-80 space-y-5">

      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">

        <Card
          title="Saldo"
          icon={<Wallet />}
        >
          <p className={`text-2xl font-semibold mt-2
            ${summary.balance > 0 ? "text-primary-500" : "text-red-400"}`}
          >
            {formatCurrency(summary.balance)}
          </p>
        </Card>

        <Card
          title="Receitas"
          icon={<ArrowUp />}
        >

          <p className="text-2xl font-semibold mt-2 text-primary-500">
            {formatCurrency(summary.totalIncomes)}
          </p>

        </Card>

        <Card
          title="Despesas"
          icon={<ArrowDown className="text-red-600" />}
        >

          <p className="text-2xl font-semibold mt-2 text-red-600">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>

    </main>
  )

}