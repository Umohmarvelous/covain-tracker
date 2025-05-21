import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { BellAlertIcon } from "@heroicons/react/24/solid";

interface TransactionProps {
  transactions?: any;
  setTransactions?: any;
  originalTransactions: any;
  setOriginalTransactions: any;
}

const TransactionsFilters = ({
  transactions,
  setTransactions,
  originalTransactions,
  setOriginalTransactions,
}: TransactionProps) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      const filteredTransactions = transactions.filter((transaction: any) =>
        transaction.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTransactions(filteredTransactions);
    } else {
      setTransactions(originalTransactions);
    }
  };

  const handleAddTransaction = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mb-4">
        <div className="xl:w-[300px] w-[170px] h-[40px] border border-search-border/60 rounded-xl flex items-center justify-between px-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-search-border" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none bg-transparent text-sm placeholder:text-card-border text-primary"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-row">
          <button
            className="p-2 xl:w-auto flex mr-3 bg-zinc-100 rounded-xl">
            <BellAlertIcon className="w-6" />
          </button>
          <button onClick={handleAddTransaction}
            className=" bg-zinc-100 p-2 xl:w-auto text-white rounded-xl flex items-center justify-center cursor-pointer">
            <PlusCircleIcon className="w-7 text-black" />
            {/* <span className="text-sm font-medium">Add transaction</span> */}
          </button>
        </div>
      </div>
      {showModal && (
        <AddTransactionModal
          setShowModal={setShowModal}
          setTransactions={setOriginalTransactions}
          transactions={transactions}
        />
      )}
    </>
  );
};

export default TransactionsFilters;
