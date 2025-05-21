import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className='w-full p-0 overflow-x-auto '>
      {/* <div className='w-full p-0'> */}
      {/* head
        <div>
          <div className="flex flex-row ">
            <div className="text-black pl-20">Name</div>
            <div className='text-black pl-38'>Date</div>
            <div className='text-black pl-58'>Amount Used</div>
          </div>
        </div> */}
      {/* <div className="w-full flex"> */}
      <div className="rounded-xl w-full h-auto">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
