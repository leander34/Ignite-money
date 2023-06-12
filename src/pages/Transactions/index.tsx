import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormater, priceFormater } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { useContextSelector } from "use-context-selector";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });
  function renderTransactions() {
    return transactions.map((transaction) => {
      return (
        <tr key={transaction.id}>
          <td>{transaction.description}</td>
          <td>
            <PriceHighlight variant={transaction.type}>
              {transaction.type === "outcome" && "- "}
              {priceFormater.format(transaction.price)}
            </PriceHighlight>
          </td>
          <td>{transaction.category}</td>
          <td>{dataFormater.format(new Date(transaction.createdAt))}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>{renderTransactions()}</tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
