"use client"

import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const AddTask = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, SetNewTaskValue] = useState<string>('');

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
        });

        SetNewTaskValue("");
        router.refresh();
        setModalOpen(false);

    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)}
                className="btn btn-primary w-full">Add New Task <AiOutlinePlus size={18} />
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action">
                        <input value={newTaskValue}
                            onChange={(e) => SetNewTaskValue(e.target.value)}
                            type="text" placeholder="Type here"
                            className="input input-bordered w-full max-w-xs" />
                        <button
                            type="submit" className="btn ms-2">Submit</button>
                    </div>

                </form>
            </Modal>
        </div>

    );
};
