import React from "react";
import { WishType } from "../types";

type WishProps = WishType & {
    onMarkAsDone: (id: number) => void;
    onDelete: (id: number) => void;
};

const Wish: React.FC<WishProps> = ({ id, title, description, isCompleted, onMarkAsDone, onDelete }) => {
    return (
        <div className={`wish-container ${isCompleted ? "complete" : "not-completed"}`}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Status: {isCompleted ? "Completed" : "Not Completed"}</p>
            <button onClick={() => onMarkAsDone(id)} disabled={isCompleted}>
                Mark as Done
            </button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default Wish;
