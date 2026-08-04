import type { Transaction, TransactionFilter, TransactionSummary } from "../types/transactions.types";
import { api } from "./api";



export default async function getTransactions(filter?: Partial<TransactionFilter>): Promise<Transaction[]> {

  const { data } = await api.get<Transaction[]>("/transactions", {
    params: filter
  })

  return data

}

export const getTransactionSummary = async (month: number, year: number): Promise<TransactionSummary> => {

  const { data } = await api.get<TransactionSummary>("/transactions/summary", {
    params: { month, year }
  })

  return data

}