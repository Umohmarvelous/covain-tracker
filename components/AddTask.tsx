"use client";

import { AiOutlinePlus, AiTwotoneEuroCircle } from "react-icons/ai";
import Modal from "./Modal";
import React, { FormEventHandler, useEffect, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { H3Icon } from "@heroicons/react/24/solid";



const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newBudgetValue, setNewBudgetValue] = useState<string>("");
  const [newBudgetAmount, setNewBudgetAmount] = useState<string>("");
  const [newDateRecord, setNewDateRecord] = useState<string>();
  const [newIcon, setNewIcon] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");
  const [newDetailValue, setNewDetailValue] = useState<string>("");
  // Initialize state from localStorage or default to false
  const [show, setShow] = React.useState(true)

  // // Load the saved state from localStorage when component mounts
  // useEffect(() => {
  //   const savedState = localStorage.getItem('checkboxState')
  //   if (savedState !== null) {
  //     setShow(JSON.parse(savedState))
  //   }
  // }, [])

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newBudgetValue,
      amount: newBudgetAmount,
      date: newDateRecord,
      icon: newIcon,
      tag: newTag,
      message: newDetailValue,
    });
    setNewBudgetValue("");
    setNewDetailValue("");
    setNewBudgetAmount("");
    setNewDateRecord("");
    setNewIcon("");
    setNewTag("");
    setNewDetailValue("");
    setModalOpen(false);
    router.refresh();


    // // Toggle the checkbox state
    // const newState = !show
    // setShow(newState)
    // // Save the new state to localStorage
    // localStorage.setItem('checkboxState', JSON.stringify(newState))
    // if (show === false) {
    //   setShow(true)
    // } else setShow(false)

  };

  const showOnClick = () => {
    // e.preventDefault()
    setModalOpen(true)

    if (show === false) {
      setShow(true)
    } else setShow(false)
    router.refresh();

  }

  return (
    <div>
      <div className="border-0 w-full h-auto justify-center flex-col">
        <button
          onClick={showOnClick}
          className='w-full mb-5 btn bg-emerald-500 border-0 hover:bg-emerald-700 text-white'>
          Create Budget
          <AiTwotoneEuroCircle className='text-black' size={20} />
        </button>
      </div>
      {show && <div className="w-full h-full flex self-center justify-center p-30 border-dashed border-3 border-gray-400 rounded-xl">
        <h3 className="text-gray-400">No budget created yet!</h3>
      </div>}


      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg '>Add new task</h3>
          <div className='text-black modal-action flex flex-col gap-5 items-center justify-between w-full'>
            <div className="w-full flex flex-row gap-4 items-start justify-between">
              {/* Budget text */}
              <div className='label flex flex-col items-start justify-between w-full'>
                <label htmlFor="newBudgetValue" className='text-sm text-black'>Create name</label>
                <input
                  id="newBudgetValue"
                  value={newBudgetValue}
                  onChange={(e) => setNewBudgetValue(e.target.value)}
                  type='text'
                  placeholder='Type here'
                  className='bg-gray-200 text-black input input-bordered w-full'
                />
              </div>
              {/* Budget Amount */}
              <div className='label flex flex-col items-start text-black'>
                <label htmlFor="newBudgetAmount" className='text-sm'>Budget Amount</label>
                <input
                  type='text'
                  id="newBudgetAmount"
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                  placeholder="e.g., 1,000,000"
                  className='text-black bg-gray-200 input input-bordered w-30'
                />
              </div>
            </div>
            <div className="w-full flex flex-row gap-4 items-start justify-between text-black">
              {/* Date of Budget */}
              <div className='label flex flex-col items-start'>
                <label htmlFor="newDateRecord" className='text-sm text-black'>Record Date</label>
                <input
                  id="newDateRecord"
                  type='date'
                  value={newDateRecord}
                  style={{
                    // backgroundColor: '#f6f6f6'
                  }}
                  onChange={(e) => setNewDateRecord(e.target.value)}
                  className='text-black bg-gray-200 input input-bordered w-full'
                />
              </div>
              {/* Emoji Icon */}
              <div className='label flex flex-col items-start'>
                <label htmlFor="newIcon" className='text-sm text-black'>Icon</label>
                <input
                  id="newIcon"
                  type='image'
                  value={newIcon}
                  style={{
                    // backgroundColor: '#f6f6f6'
                  }}
                  onChange={(e) => setNewIcon(e.target.value)}
                  className='bg-gray-200 input input-bordered w-full'
                />
              </div>
              {/* Tags */}
              <div className=' label flex flex-col items-start'>
                <label htmlFor="newTag" className='text-sm text-black'>Tags</label>
                <input
                  id="newTag"
                  type=''
                  value={newTag}
                  style={{
                    // backgroundColor: 'red'
                  }}
                  onChange={(e) => setNewTag(e.target.value)}
                  className='bg-gray-200 input input-bordered w-full'
                />
              </div>
            </div>
            {/* Budget message */}
            <div className='label flex flex-col items-start'>
              {/* <label htmlFor="newDeatailVaue" className='text-sm'>Enter message</label> */}
              {/* <textarea
                rows={60}
                cols={40}
                id="newDeatailVaue"
                value={newDetailValue}
                style={{
                  backgroundColor: '#f6f6f6'
                }}
                onChange={(e) => setNewDetailValue(e.target.value)}
                placeholder='Add message'
                className='input input-bordered h-60 p-10 w-full'
              /> */}
            </div>

            <button type='submit' className='btn w-full'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
