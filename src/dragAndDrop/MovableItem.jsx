import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import showNotification from "../shared/helper/notification";
import {deleteTask, updateTask, updateTaskStatus} from "../service/task.api";

const MovableItem = ({
                         id,
                         name,
                         index,
                         currentColumnName,
                         moveCardHandler,
                         setItems,
                         getAllTasks = () => {},
                         items
                     }) => {
    const ref = useRef(null);

    const changeItemColumn = async (currentItem, columnName) => {
        // console.log({currentItem, columnName})
        try {
            // Find the task to update
            const taskToUpdate = items.find(task => task.id === currentItem.id);
            if (!taskToUpdate) return;

            // Create updated task object
            const updatedTask = {
                ...taskToUpdate,
                taskStatus: columnName,
                taskColumnName: columnName // Update both status and columnName
            };

            // Call API to update task
            const response = await updateTaskStatus(updatedTask);

            if (response.status === 200) {
                // Update local state after successful API call
                setItems(prevState =>
                    prevState.map(task =>
                        task.id === currentItem.id
                            ? { ...task, taskStatus: columnName, taskColumnName: columnName }
                            : task
                    )
                );
                showNotification("Task moved successfully", "success");
                getAllTasks(); // Refresh the list
            } else {
                throw new Error(response.error || "Failed to update task");
            }
        } catch (error) {
            showNotification(error.message || "Error updating task", "error");
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteTask(id);
            if (response.status === 200) {
                showNotification("Task deleted successfully", "success");
                setItems(prevState => prevState.filter(task => task.id !== id));
                getAllTasks();
            } else {
                throw new Error(response.error || "Failed to delete task");
            }
        } catch (error) {
            showNotification(error.message || "Error deleting task", "error");
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async () => {
        const updatedName = prompt("Enter task name for updating:", name);
        if (!updatedName) return;

        try {
            const taskToUpdate = items.find(task => task.id === id);
            if (!taskToUpdate) {
                showNotification("Task not found", "error");
                return;
            }

            const updatedTask = { ...taskToUpdate, taskName: updatedName };
            const response = await updateTask(updatedTask);

            if (response.status === 200) {
                showNotification("Task updated successfully", "success");
                setItems(prevState =>
                    prevState.map(task =>
                        task.id === id ? { ...task, taskName: updatedName } : task
                    )
                );
                getAllTasks();
            } else {
                throw new Error(response.error || "Failed to update task");
            }
        } catch (error) {
            showNotification(error.message || "Error updating task", "error");
            console.error("Error updating task:", error);
        }
    };

    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { id, index, name, currentColumnName },
        collect: (monitor) => {
            const dragging = monitor.isDragging();
            if (dragging) {
                // console.log(`Dragging started: ${name} (ID: ${id}) (currentColumnName:${currentColumnName})`);
            }
            return { isDragging: dragging };
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                // console.log(`Dropped ${item.name} (ID: ${item.id}) into ${dropResult.name}`);
                changeItemColumn(item, dropResult.name);
            } else {
                console.log(`Dragging ended without dropping for ${item.name} (ID: ${item.id})`);
            }
        },
    });


    // const [, drop] = useDrop({
    //     accept: "TASK",
    //     hover(item, monitor) {
    //         if (!ref.current) return;
    //         const dragIndex = item.index;
    //         const hoverIndex = index;
    //         if (dragIndex === hoverIndex) return;
    //         moveCardHandler(dragIndex, hoverIndex);
    //         item.index = hoverIndex;
    //     },
    // });
    const [, drop] = useDrop({
        accept: "TASK",
        hover(item, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) return;

            // Only handle reordering within the same column
            if (item.currentColumnName === currentColumnName) {
                moveCardHandler(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
        },
    });
    drag(drop(ref));

    return (
        <div
            ref={ref}
            className="movable-item"
            style={{ opacity: isDragging ? 0.4 : 1 }}
        >
            <div className="task_name">{name}</div>
            <div className="update_task">
                <FaEdit className="icon edit-icon" onClick={handleUpdate} />
                <FaTrash className="icon delete-icon" onClick={() => handleDelete(id)} />
            </div>
        </div>
    );
};

export default MovableItem;