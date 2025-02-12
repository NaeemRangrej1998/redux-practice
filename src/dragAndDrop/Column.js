import React from "react";
import {useDrop} from "react-dnd";
import {COLUMN_NAMES} from "./constants";

const Column = ({children, className, title}) => {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: "TASK",
        drop: () => ({name: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        // Override monitor.canDrop() function
        canDrop: (item) => {
            const {DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE} = COLUMN_NAMES;
            const {currentColumnName} = item;
            return (
                currentColumnName === title ||
                (currentColumnName === DO_IT && title === IN_PROGRESS) ||
                (currentColumnName === IN_PROGRESS &&
                    (title === DO_IT || title === AWAITING_REVIEW)) ||
                (currentColumnName === AWAITING_REVIEW &&
                    (title === IN_PROGRESS || title === DONE)) ||
                (currentColumnName === DONE && title === AWAITING_REVIEW)
            );
        },
    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return "rgb(256,256,256)";
            } else if (!canDrop) {
                return "rgb(256,256,256)";
            }
        } else {
            return "";
        }
    };

    return (
        <div
            ref={drop}
            className={className}
            style={{backgroundColor: getBackgroundColor()}}
        >
            <p style={{textAlign:"center"}}>{title}</p>
            {children}
        </div>
    );
};

export default Column;
