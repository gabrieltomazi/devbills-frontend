import { useEffect, useState } from "react"
import MonthYearSelect from "../components/MonthYearSelect"
import { api } from "../services/api"

export default function DashboardPage() {

  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
  const [year, setYear] = useState<number>(currentDate.getFullYear())

  useEffect(() => {
    async function getTransactions() {
      const response = await api.get('/transactions')
    }
  }, [])

  return (
    <main>
      <div className="flex flex-col sm:flex-row gap-2 justify-between p-4 md:px-20 2xl:px-80">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
      </div>
    </main>
  )

}