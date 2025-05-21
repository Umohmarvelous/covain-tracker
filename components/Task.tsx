"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2, FiWatch } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { WalletIcon } from "@heroicons/react/24/solid";
import { AiOutlineClose } from "react-icons/ai";

interface TaskProps {
  task: ITask;

}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [nameEdit, setNameEdit] = useState<string>(task.text);
  const [amountEdit, setAmountEdit] = useState<string>(task.amount);
  const [dateEdit, setDateEdit] = useState<any>(task.date);
  const [tagEdit, settagEdit] = useState<string>(task.tag);
  const [iconEdit, setIconEdit] = useState<string>(task.icon);
  const [messageEdit, setMessageEdit] = useState<string>(task.message);



  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: nameEdit,
      date: dateEdit,
      amount: amountEdit,
      icon: iconEdit,
      tag: tagEdit,
      message: messageEdit
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <div key={task.id} className="flex flex-row-reverse border-b-1 mb-1">
      <AiOutlineClose
        onClick={() => setOpenModalDeleted(true)}
        cursor='pointer'
        className='text-red-600 font-bolder m-2 p-2'
        size={30}
      />
      <div className="w-full flex flex-row items-center justify-center p-4 pl-0">
        <div>
          <FiWatch size={45}
            className="bg-gray-600 p-2 rounded-xl mr-2" />
        </div>
        <div className='w-full pl-0'>
          <div className="text-lg font-bold text-emerald-400">
            {task.text}
          </div>
          <div className="text-sm text-gray-400">
            {task.date}
          </div>
        </div>
        <div className="flex items-center mr-30 justify-center px-5 py-2 font-normal">
          <h2 className="text-red-600 text-lg font-bold">{`${'-$' + ''}`}</h2>
          <h2 className="text-gray-600 text-lg">{task.amount}</h2>
        </div>
        {/* <td className='w-full'>{task.date}</td> */}
        <div className='flex gap-5 items-center justify-between'>
          <FiEdit
            onClick={() => setOpenModalEdit(true)}
            cursor='pointer'
            className='text-blue-500'
            size={20}
          />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg '>Add new task</h3>
              <div className='modal-action flex flex-col gap-5 items-center justify-between w-full'
                style={{
                  marginLeft: '100px',
                  border: '2px solid red'
                }}>
                <div className="w-full flex flex-row gap-4 items-start justify-between">
                  {/* Budget text */}
                  <div className='label flex flex-col items-start justify-between w-full'>
                    <label htmlFor="newBudgetValue" className='text-sm'>Create name</label>
                    <input
                      id="newBudgetValue"
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                      type='text'
                      placeholder='Type here'
                      className='input input-bordered w-full'
                    />
                  </div>
                  {/* Budget Amount */}
                  <div className='label flex flex-col items-start'>
                    <label htmlFor="newBudgetAmount" className='text-sm'>Budget Amount</label>
                    <input
                      type='number'
                      id="newBudgetAmount"
                      value={amountEdit}
                      onChange={(e) => setAmountEdit(e.target.value)}
                      placeholder="e.g., 1,000,000"
                      className='input input-bordered w-30'
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-start justify-between">
                  {/* Date of Budget */}
                  <div className='label flex flex-col items-start'>
                    <label htmlFor="newDateRecord" className='text-sm'>Record Date</label>
                    <input
                      id="newDateRecord"
                      type='date'
                      value={dateEdit}
                      onChange={(e) => setDateEdit(e.target.value)}
                      className='input input-bordered w-full'
                    />
                  </div>
                  {/* Emoji Icon */}
                  <div className='label flex flex-col items-start'>
                    <label htmlFor="newIcon" className='text-sm'>Icon</label>
                    <input
                      id="newIcon"
                      type='image'
                      value={iconEdit}
                      onChange={(e) => setIconEdit(e.target.value)}
                      className='input input-bordered w-full'
                    />
                  </div>
                  {/* Tags */}
                  <div className='label flex flex-col items-start'>
                    <label htmlFor="newTag" className='text-sm'>Tags</label>
                    <input
                      id="newTag"
                      type=''
                      value={tagEdit}
                      onChange={(e) => settagEdit(e.target.value)}
                      className='input input-bordered w-full'
                    />
                  </div>
                </div>
                {/* Budget message */}
                <div className='label flex flex-col items-start'>
                  <label htmlFor="newDeatailVaue" className='text-sm'>Enter message</label>
                  <textarea
                    rows={30}
                    cols={30}
                    id="newDeatailVaue"
                    value={messageEdit}
                    onChange={(e) => setMessageEdit(e.target.value)}
                    placeholder='Add message'
                    className='input input-bordered h-60 p-10 w-full'
                  />
                </div>

                <button type='submit' className='btn w-full'>
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className='text-lg'>
              Are you sure, you want to delete this task?
            </h3>
            <div className='modal-action' style={{
              display: 'flex',
              alignItems: 'flex-start',
            }}>
              <button onClick={() => handleDeleteTask(task.id)} className='btn'>
                Yes
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div >
  );
};

export default Task;
