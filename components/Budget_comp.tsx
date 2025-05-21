import React from 'react'
import { getAllTodos } from "@/api";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";
import { CalendarIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, WalletIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from "@heroicons/react/24/solid";



export default async function Budget_comp() {
    const tasks = await getAllTodos();

    const BudgetNavLink = [
        {
            name: 'Overview',
            path: '/',
            icon: HomeIcon
        },
        {
            name: 'Calender',
            path: '/',
            icon: CalendarIcon
        },
        {
            name: 'History',
            path: '/',
            icon: DocumentTextIcon
        },
    ]

    return (
        //! Container
        <div className="w-vw rounded-3xl px-3 py-7">
            <div className=" flex flex-row rounded-4xl ">
                {/* LeftSide Nav */}
                <div className="w-full pb-0 mr-10">
                    <div className="flex flex-col items-center justify-between">{/* App name and logo */}
                        <div className="w-full flex flex-row gap-2 justify-between mb-7">

                            <div className="gap-2 flex flex-row justify-center items-center">
                                {/* <img
                                src="https://images.unsplash.com/photo-1677636790982-0f3a4b8c5d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                className="w-8 h-8 rounded-full border-black border-1" />
                            <h1 className="text-black flex self-baseline">Budget</h1> */}
                                {/* <div className="flex flex-row w-full mb-8"> */}
                                <WalletIcon className="text-sm w-8 mr-2 text-black" />
                                <div className="flex flex-col">
                                    <h3 className="text-xl text-emerald-400 font-semibold">Home Wallet</h3>
                                    {/* <h6 className="text-sm text-black" >Change default wallet</h6> */}
                                </div>
                                {/* </div> */}
                            </div>

                            {/* <Task key={task.id} task={task} /> */}
                            {/* TopBar Tabs */}
                            {/* <div className="border-2 flex flex-row w-auto">
                            {BudgetNavLink.map((link, index) => (
                                <div key={index} className='flex flex-row items-baseline justify-center'>
                                    <Link href={link.path} className="font-normal cursor-pointer flex flex-row justify-between items-center">
                                        <h1
                                            className={`text-sm p-2 hover:text-blue-600 font-normal xl:block hidden ${link ? "text-black text-lg " : "text-gray-400"}`}>
                                            {link.name}
                                        </h1>
                                    </Link>
                                </div>
                            ))}
                        </div> */}

                            <div className="flex flex-row">
                                {/* Search and filter feature */}
                                {/* <form className=" flex flex-row w-50 items-center justify-center">
                                <label htmlFor="">
                                </label> */}
                                <input
                                    type="search"
                                    className="bg-gray-200 mr-3 pl-3 flex items-center justify-center w-50 h-auto  rounded-lg text-black"
                                    placeholder='Search here'>
                                </input>
                                {/* </form> */}
                                <div className=''>
                                    <WalletIcon className="text-sm w-8 mr-2 text-black" />
                                </div>
                            </div>
                        </div>

                        <span className="h-auto w-full flex-col mt-5 mb-5 flex items-center justify-center">
                            <h1 style={{
                                display: 'flex',
                                alignSelf: 'flex-start',
                                color: '#000',
                                fontWeight: 'bold'
                            }}>Financial Record</h1>
                            <div className="h-auto w-full mt-3 flex gap-4 flex-row items-center justify-between">

                                <div className="w-full h-full px-10 text-sm text-gray-800"
                                    style={{
                                        backgroundColor: '#fff0e7',
                                        height: '7rem',
                                        width: '200px',
                                        textWrap: 'wrap',
                                        borderRadius: '25px',
                                        display: 'flex',
                                        alignItems: 'start',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        paddingTop: '10px',
                                        paddingBottom: '35px'
                                    }}>
                                    <h3 style={{ color: 'grey' }}>Total Money:</h3>
                                    <h1 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                                        $23,244,243
                                    </h1>
                                </div>
                                <div className="w-full h-full px-10 text-sm text-gray-800"
                                    style={{
                                        backgroundColor: '#ebfdef',
                                        height: '7rem',
                                        width: '200px',
                                        textWrap: 'wrap',
                                        borderRadius: '25px',
                                        display: 'flex',
                                        alignItems: 'start',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        paddingTop: '20px',
                                        paddingBottom: '35px'
                                    }}>
                                    <h2 style={{ color: 'grey' }}>Saved this month :</h2>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', display: 'flex', alignSelf: 'start' }}>$595,350</h2>
                                </div>
                            </div>
                        </span>
                    </div>


                    {/* TopLeft SectionTwo */}
                    <div className="py-8 w-full h-auto flex flex-col justify-center" >

                        {/* Wallet */}
                        <div className="border-0 flex flex-col justify-between w-full mb-10">
                            <AddTask />
                        </div>

                        {/* Add Button */}
                        <div className="w-full h-auto">
                            <TodoList tasks={tasks} />
                        </div>
                    </div>
                </div>


                {/* RightSide Nav */}
                <div className="w-90 py-5 pb-0 px-4 flex flex-col items-center justify-start rounded-tl-2xl rounded-tr-4xl rounded-br-4xl "
                    style={{
                        borderRadius: ' 30px',
                        backgroundColor: '#f4f2f3',

                    }}>
                    {/*//* Top Section - contains remainder and profilePic  */}
                    <div className="w-full h-auto gap-3 mb-5 flex flex-row items-center justify-between ">
                        <div className="flex flex-row gap-2">
                            <Cog6ToothIcon className="text-black text-sm w-6" />
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1677636790982-0f3a4b8c5d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                            className="w-8 h-8 rounded-full border-2 border-black"
                        />
                    </div>
                    <span className="h-auto w-full mt-5 mb-5 flex items-center justify-center">
                        <div className="h-auto w-auto flex gap-4 flex-col items-center justify-between">
                            <h1 style={{
                                display: 'flex',
                                alignSelf: 'flex-start',
                                color: '#000',
                                fontWeight: 'bold'
                            }}>Financial Record</h1>
                            <div className="w-full h-full px-10 text-sm text-gray-800"
                                style={{
                                    backgroundColor: '#fff0e7',
                                    height: '7rem',
                                    width: '200px',
                                    textWrap: 'wrap',
                                    borderRadius: '25px',
                                    display: 'flex',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingTop: '10px',
                                    paddingBottom: '35px'
                                }}>
                                <h3 style={{ color: 'grey' }}>Total Money:</h3>
                                <h1 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                                    $23,244,243
                                </h1>

                            </div>
                            <div className="w-full h-full px-10 text-sm text-gray-800"
                                style={{
                                    backgroundColor: '#ebfdef',
                                    height: '7rem',
                                    width: '200px',
                                    textWrap: 'wrap',
                                    borderRadius: '25px',
                                    display: 'flex',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingTop: '20px',
                                    paddingBottom: '35px'
                                }}>
                                <h2 style={{ color: 'grey' }}>Saved this month :</h2>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', display: 'flex', alignSelf: 'start' }}>$595,350</h2>
                            </div>
                        </div>
                    </span>

                    <hr className="border-1 border-gray-100 p-0 w-full" />
                    <span className="h-40 w-full mt-5 mb-5">
                        <div className="h-auto py-3 flex flex-row items-center justify-between">
                            <h3 className="text-black text-normal">Categories</h3>
                            <PlusCircleIcon className="text-black text-sm w-8" />
                        </div>
                    </span>
                </div>
            </div>
        </div >

    )
}
