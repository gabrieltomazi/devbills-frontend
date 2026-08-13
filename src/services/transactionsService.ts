import type {
  CreateTransactionDTO,
  MonthlyItem,
  Transaction,
  TransactionFilter,
  TransactionSummary,
} from "../types/transactions.types";
import { api } from "./api";

export default async function getTransactions(
  filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> {
  const { data } = await api.get<Transaction[]>("/transactions", {
    params: filter,
  });

  return data;
}

export const getTransactionSummary = async (
  month: number,
  year: number,
): Promise<TransactionSummary> => {
  const { data } = await api.get<TransactionSummary>("/transactions/summary", {
    params: { month, year },
  });

  return data;
};

export const getTransactionsMonthly = async (
  month: number,
  year: number,
  months?: number,
): Promise<MonthlyItem[]> => {
  const { data } = await api.get<{ history: MonthlyItem[] }>("/transactions/history", {
    params: { month, year, months },
  });

  return data.history;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export const createTransaction = async (
  transactionData: CreateTransactionDTO,
): Promise<Transaction> => {
  const { data } = await api.post<Transaction>("/transactions", transactionData);
  return data;
};
