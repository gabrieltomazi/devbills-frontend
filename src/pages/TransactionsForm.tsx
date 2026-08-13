import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import Select from "../components/select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { getCategories } from "../services/categoryService";
import { createTransaction } from "../services/transactionsService";
import type { Category } from "../types/category.types";
import { type CreateTransactionDTO, TransactionType } from "../types/transactions.types";


interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType
}




export default function TransactionsForm() {

  const currentDate = new Date().toLocaleDateString("sv-SE");

  const initialFormData = {
    description: "",
    amount: 0,
    date: currentDate,
    categoryId: "",
    type: TransactionType.INCOME
  }



  const [formData, setFormData] = useState<FormData>(initialFormData);
  const formId = useId();

  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const filteredCategories = categories.filter(category => category.type === formData.type)

  const navigate = useNavigate()

  useEffect(() => {

    const fetchCategories = async () => {

      const response = await getCategories()
      setCategories(response)

    }

    fetchCategories();

  }, [])


  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData(prev => ({ ...prev, type: itemType }))
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {

      if (!validateForm()) {
        toast.error("Preencha todos os campos!")
        return
      }

      const transactionData: CreateTransactionDTO = {
        description: formData.description,
        amount: formData.amount,
        categoryId: formData.categoryId,
        type: formData.type,
        date: `${formData.date}T12:00:00.000Z`
      }
      await createTransaction(transactionData);

      toast.success("Transação adicionada com sucesso!")
      navigate("/transacoes")
    } catch (err) {
      toast.error("Falha ao adicionar transação")
      console.error("❌ Erro ao enviar o formulário", err)
    }

  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {

    if (!formData.description || !formData.amount || !formData.date || !formData.categoryId) {
      setError("Preencha todos os campos!")
      return false
    }

    if (formData.amount <= 0) {
      setError("O valor deve ser maior que 0")
      return false
    }

    return true

  }

  const handleCancel = () => {
    navigate("/transacoes")
  }

  return (
    <main className="container-app">
      <h1>Nova Transação</h1>
      <Card>

        {error && (
          <div className="flex gap-2 items-center bg-red-300 border-red-700 rounded-xl p-4 mb-2 ">
            <AlertCircle className="w-5 h-5 text-red-700" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2 mb-4">

            <label htmlFor={formId}>
              Tipo de transação
            </label>
            <TransactionTypeSelector
              id={formId}
              value={formData.type}
              onChange={handleTransactionType}
            />
          </div>


          <div className="flex flex-col">

            <Input
              error={error && formData.description.length === 0 ? "O valor é obrigatório" : undefined}
              label="Descrição"
              name="description"
              placeholder="Ex: Supermercado, Salário, etc..."
              type="text"
              onChange={handleChange}
              value={formData.description}
            />

            <Input
              className="[color-scheme:dark]"
              error={error && formData.amount <= 0 ? "O valor é obrigatório" : undefined}
              label="Valor"
              placeholder="R$ 0,00"
              name="amount"
              type="number"
              step="0.01"
              icon={<DollarSign className="w-4 h-4" />}
              onChange={handleChange}
              value={formData.amount}
            />

            <Input
              error={error && formData.date.length === 0 ? "O valor é obrigatório" : undefined}
              label="Data"
              name="date"
              type="date"
              icon={<Calendar />}
              onChange={handleChange}
              value={formData.date}
            />

            <Select
              error={error && formData.categoryId === "" ? "O valor é obrigatório" : undefined}
              label="Categoria"
              name="categoryId"
              onChange={handleChange}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map(category => ({
                  value: category.id,
                  label: category.name
                }))
              ]}
              value={formData.categoryId}
              icon={<Tag className="w-4 h-4" />}

            />
          </div>

          <div className="flex justify-end space-x-3 mt-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              type="button"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={formData.type === TransactionType.EXPENSE
                ? 'danger'
                : "success"}
            >
              <div className="flex gap-2">
                <Save />
                Salvar
              </div>
            </Button>
          </div>


        </form>
      </Card>
    </main >
  )

}