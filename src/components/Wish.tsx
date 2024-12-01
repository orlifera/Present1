import React from "react";
import { WishType } from "../types";

type WishProps = WishType & {
    onMarkAsDone: (id: number) => void;
    onDelete: (id: number) => void;
};

const Wish: React.FC<WishProps> = ({ id, title, description, isCompleted, onMarkAsDone, onDelete }) => {
    return (
        <div className={`wish-container ${isCompleted ? "complete" : "not-completed"}`}>
            <h2 id="wish-title" className="title">{title}</h2>
            <div className="wish-details">
                <p className="wish-description">{description}</p>
                <p className="wish-status">{isCompleted ? "Completed" : "Not Completed"}</p>
            </div>
            <button className="btn btn-complete" onClick={() => onMarkAsDone(id)} disabled={isCompleted}>
                Mark as Completed
            </button>
            <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>
        </div >
    );
};

export default Wish;
