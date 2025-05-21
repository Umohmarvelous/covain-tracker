import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon, CurrencyDollarIcon, TruckIcon } from "@heroicons/react/24/outline";
import AddTransactionModal from "./AddTransactionModal";
import { useState } from "react";

interface TransactionProps {
  transactions?: any;
  setTransactions?: any;
  setOriginalTransactions: any;
}
const RecentTransactions = ({
  transactions,
  setTransactions,
  setOriginalTransactions,
}: TransactionProps) => {
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const tableHeaders = ["Transaction title", "Amount", "Date", "Card", "Actions"];

  const onDelete = (id: number) => {
    const newTransactions = transactions.filter((transaction: any) => transaction.id !== id);
    setTransactions(newTransactions);
    setOriginalTransactions(newTransactions);
  };

  const onEdit = (transaction: any) => {
    setShowModal(true);
    setInitialData(transaction);
  };
  return (
    <>
      <div className="w-full relative overflow-x-auto h-full overflow-y-auto mt-3 pb-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 border-b border-gray-300">
            <tr>
              {tableHeaders.map((header: string, index: number) => (
                <th
                  scope="col"
                  className={`${index === 0 ? "pr-6" : "px-6"} py-3 text-gray-400 font-semibold`}
                  key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions
              .slice()
              .reverse()
              .map((Transaction: any) => (
                <tr className="bg-zinc-100" key={Transaction.id}>
                  <th scope="row" className="pr-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {Transaction.category === "car" && (
                        <span
                          className={`w-7 h-7 rounded-md flex items-center justify-center bg-truck`}>
                          <TruckIcon className="w-5 h-5 text-white" />
                        </span>
                      )}
                      {Transaction.category === "groceries" && (
                        <span
                          className={`w-7 h-7 rounded-md flex items-center justify-center bg-shop`}>
                          <ShoppingBagIcon className="w-5 h-5 text-white" />
                        </span>
                      )}
                      {Transaction.category === "salary" && (
                        <span
                          className={`w-7 h-7 rounded-md flex items-center justify-center bg-coin`}>
                          <CurrencyDollarIcon className="w-5 h-5 text-white" />
                        </span>
                      )}
                      <span className="font-semibold text-primary">{Transaction.title}</span>
                    </div>
                  </th>
                  <td
                    className={`px-6 py-3 font-medium ${
                      Transaction.type === "expense" ? "text-red-600" : "text-green-600"
                    }`}>
                    {Transaction.type === "expense" ? "-" : "+"}${Transaction.amount}
                  </td>
                  <td className="px-6 py-3 font-medium text-primary">
                    {Transaction.month}/{Transaction.day}
                  </td>
                  <td className="px-6 py-3 font-medium text-primary">{Transaction.card}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <PencilSquareIcon
                        onClick={() => onEdit(Transaction)}
                        className="w-5 h-5 text-blue-600 cursor-pointer font-medium"
                      />
                      <TrashIcon
                        onClick={() => onDelete(Transaction.id)}
                        className="w-5 h-5 text-red-600 cursor-pointer font-medium"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <AddTransactionModal
          setShowModal={setShowModal}
          setTransactions={setOriginalTransactions}
          transactions={transactions}
          initialData={initialData}
        />
      )}
    </>
  );
};

export default RecentTransactions;
