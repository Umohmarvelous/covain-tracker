import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface AddTransactionModalProps {
  setShowModal: (showModal: boolean) => void;
  setTransactions: (transactions: any) => void;
  transactions: any;
  initialData?: any;
}

const InputField = ({ type, placeholder, value, onChange }: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full h-[45px] border border-search-border/60 rounded-lg px-2 outline-none bg-transparent text-black text-[15px] font-medium"
  />
);

const SelectField = ({ value, onChange, options }: any) => (
  <div className="w-full border border-search-border/60 rounded-lg px-2">
    <select
      value={value}
      onChange={onChange}
      className="w-full h-[45px] outline-none bg-transparent text-black text-[15px] font-medium">
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const AddTransactionModal = ({
  setShowModal,
  setTransactions,
  transactions,
  initialData,
}: AddTransactionModalProps) => {
  const [data, setData] = useState(
    initialData || {
      id: Math.random(),
      title: "",
      amount: 0,
      type: "income",
      month: 0,
      day: 0,
      category: "car",
      card: "Codeitdown",
    }
  );

  const onSubmit = () => {
    if (initialData) {
      const newTransactions = transactions.map((transaction: any) =>
        transaction.id === initialData.id ? data : transaction
      );
      setTransactions(newTransactions);
    } else {
      setTransactions([...transactions, data]);
    }
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[100] bg-black/60 flex items-center justify-center">
      <div className="flex flex-col gap-3 md:w-[800px] w-[85%] bg-white rounded-2xl p-5 items-start shadow-2xl">
        <div className="w-full flex items-center justify-between">
          <span className="text-xl font-semibold">Add Transaction</span>
          <XMarkIcon
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="w-full flex md:flex-row flex-col items-center gap-5">
          <InputField
            type="text"
            placeholder="Transaction Title"
            value={data.title}
            onChange={(e: any) => setData({ ...data, title: e.target.value })}
          />
          <SelectField
            value={data.type}
            onChange={(e: any) => setData({ ...data, type: e.target.value })}
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
        </div>
        <div className="w-full flex md:flex-row flex-col items-center gap-5">
          <InputField
            type="number"
            placeholder="Amount"
            value={data.amount}
            onChange={(e: any) => setData({ ...data, amount: Number(e.target.value) })}
          />
          <SelectField
            value={data.category}
            onChange={(e: any) => setData({ ...data, category: e.target.value })}
            options={[
              { value: "car", label: "Car" },
              { value: "groceries", label: "Groceries" },
              { value: "salary", label: "Salary" },
            ]}
          />
        </div>
        <div className="w-full flex md:flex-row flex-col items-center gap-5">
          <div className="w-full flex items-center gap-5">
            <InputField
              type="number"
              placeholder="Month"
              value={data.month}
              onChange={(e: any) => setData({ ...data, month: Number(e.target.value) })}
            />
            <InputField
              type="number"
              placeholder="Day"
              value={data.day}
              onChange={(e: any) => setData({ ...data, day: Number(e.target.value) })}
            />
          </div>
          <SelectField
            value={data.card}
            onChange={(e: any) => setData({ ...data, card: e.target.value })}
            options={[
              { value: "Codeitdown", label: "CodeItDown" },
              { value: "Personal", label: "Personal" },
            ]}
          />
        </div>
        <div className="w-full flex md:flex-row flex-col-reverse items-center justify-center md:gap-5 gap-3 mt-3">
          <button
            onClick={() => setShowModal(false)}
            className="w-full h-[45px] bg-dangerButton text-white rounded-lg flex items-center gap-2 justify-center cursor-pointer px-3">
            <span className="text-sm font-medium">Cancel</span>
          </button>
          <button
            onClick={onSubmit}
            disabled={
              !data.title ||
              !data.amount ||
              !data.category ||
              !data.month ||
              !data.day ||
              !data.card
            }
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed h-[45px] bg-primaryButton text-white rounded-lg flex items-center gap-2 justify-center cursor-pointer px-3">
            <span className="text-sm font-medium" style={
              {
                border: '2px solid red'

              }
            }>
              {initialData ? "Edit Transaction" : "Add Transaction"}
            </span>
          </button>
        </div>
      </div>
    </div >
  );
};

export default AddTransactionModal;
