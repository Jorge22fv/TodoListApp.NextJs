"use client";

import { Itask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";


interface TaskProps {
    task: Itask
}

export const Task: React.FC<TaskProps> = ({ task }) => {

    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTasktToEdit] = useState<string>(task.text)

    const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit,
        });

        router.refresh();
        setOpenModalEdit(false);

    };

    const handleDelete = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }

    return (<tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
            <FiEdit onClick={() => setOpenModalEdit(true)}
                cursor="pointer" className="text-blue-500 " size={20} />

            <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmitEdit}>
                    <h3 className="font-bold text-lg text-center">Edit Task</h3>
                    <div className="modal-action">
                        <input value={taskToEdit}
                            onChange={(e) => setTasktToEdit(e.target.value)}
                            type="text" placeholder="Type here"
                            className="input input-bordered w-full max-w-xs" />
                        <button
                            type="submit" className="btn ms-2">Submit</button>
                    </div>

                </form>
            </Modal>


            <FiTrash2 onClick={() => setOpenModalDeleted(true)}
                cursor="pointer" className="text-red-500" size={20} />
            <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted} >
                <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                <div className="modal-action">
                    <button onClick={() => handleDelete(task.id)}
                        className="btn">
                        Yes
                    </button>
                </div>

            </Modal>
        </td>

    </tr>)

};