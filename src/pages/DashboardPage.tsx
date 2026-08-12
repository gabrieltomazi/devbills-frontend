import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../components/card";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionSummary, getTransactionsMonthly } from "../services/transactionsService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions.types";
import { formatCurrency } from "../utils/formatters";


const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
}

interface ChartLabelProps {
  categoryName: string;
  percent: number;

}

export default function DashboardPage() {

  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
  const [year, setYear] = useState<number>(currentDate.getFullYear())
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary)
  const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([])

  useEffect(() => {
    async function loadTransactionsSummary() {

      const response = await getTransactionSummary(month, year);
      setSummary(response)
      console.log(response)
    }
    loadTransactionsSummary();
  }, [month, year])

  useEffect(() => {
    async function loadTransactionsMonthly() {

      const response = await getTransactionsMonthly(month, year, 3);
      setMonthlyItemsData(response)
      console.log(response)
    }
    loadTransactionsMonthly();
  }, [month, year])

  const renderPieChartLabel = ({ categoryName, percent }: ChartLabelProps) => {
    return `${categoryName}: ${(percent * 100).toFixed(1)}%`

  }

  const formatToolTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === "number" ? value : 0)
  }

  return (
    <main className="container-app space-y-5">

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
          icon={<ArrowUp className="text-primary-500" />}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-6 gap-3 mt-4">

        <Card
          title="Despesas por Categoria"
          icon={<TrendingUp size={20} className="text-primary-500" />}
          className="min-h-80"
        >
          {summary.expensesByCategory.length > 0 ? (


            <div className="h-72 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={summary.expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="categoryName"
                    label={renderPieChartLabel}
                  >
                    {summary.expensesByCategory.map(entry => (
                      <Cell key={entry.categoryId} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Legend/>
                  <Tooltip formatter={formatToolTipValue} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) :
            (<div className="flex items-center justify-center h-64 text-gray-500">
              Nenhuma despesa registrada nesse período
            </div>
            )
          }
        </Card>

        <Card
          title="Histórico Mensal"
          icon={<Calendar size={20} className="text-primary-500" />}
          className="min-h-80"
        >
          <div className="h-72 mt-4">
            {monthlyItemsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  responsive
                  data={monthlyItemsData}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94A3B8" tick={{ style: { textTransform: "capitalize" } }} />
                  <YAxis stroke="#94A3B8" tickFormatter={formatCurrency} tick={{ style: { fontSize: "12px" } }} />
                  <Tooltip formatter={formatCurrency} contentStyle={{
                    backgroundColor: "#1a1a1a",
                    borderColor: "#2a2a2a"
                  }}
                    labelStyle={{ color: "f8f8f8" }} />
                  <Legend />
                  <Bar dataKey="expenses" name="Despesas" fill="#FF6384" />
                  <Bar dataKey="income" name="Receitas" fill="#37E359" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Nenhuma despesa registrada nesse período
              </div>
            )}
          </div>

        </Card>

      </div >

      {monthlyItemsData.length > 0 && <span className="sr-only">Dados mensais carregados</span>}
    </main >
  )

}