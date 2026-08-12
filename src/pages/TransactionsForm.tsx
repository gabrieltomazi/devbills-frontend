import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import type { TransactionType } from "../types/transactions.types";
import type { Category } from "../types/category.types";
import Card from "../components/card";
import Button from "../components/button";


interface TransactionsFormProps {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType
}




export default function TransactionsForm() {

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {

    const fetchCategories = async () => {

      const response = await getCategories()

      return response

    }

    fetchCategories();

  }, [])

  return (
    <main className="container-app">
      <h1>Nova Transação</h1>
      <Card>
        <h1>Tipo de transação</h1>
        <div className="flex gap-4">
          <Button variant="danger" className="w-full">Despesa</Button>
          <Button variant="outline" className="w-full bg-green-200">Receita</Button>
        </div>
      </Card>
    </main>
  )

}