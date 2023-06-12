import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // testar após o useMemo
  const summary = useMemo(() => {
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.price;
          acc.total += transaction.price;
          return acc;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
          return acc;
        }
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
    return summary;
  }, [transactions]);
  // const summary = transactions.reduce(
  //   (acc, transaction) => {
  //     if (transaction.type === "income") {
  //       acc.income += transaction.price;
  //       acc.total += transaction.price;
  //       return acc;
  //     } else {
  //       acc.outcome += transaction.price;
  //       acc.total -= transaction.price;
  //       return acc;
  //     }
  //   },
  //   {
  //     income: 0,
  //     outcome: 0,
  //     total: 0,
  //   }
  // );
  return summary;
}
