import React, {useEffect, useState} from "react";
import '../assets/styles/App.css'
import MovableItem from "./MovableItem";
import Column from "./Column";
import {COLUMN_NAMES} from "./constants";
import {tasks} from "./task";
import {getAllTasks, saveTask, saveUser} from "../service/task.api";
import showNotification from "../shared/helper/notification";

const ManageTask = () => {
    const [items, setItems] = useState([]);
    const [taskName, setTaskName] = useState(  '')
    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState) => {
                const copiedState = [...prevState];
                copiedState.splice(hoverIndex, 1, dragItem);
                copiedState.splice(dragIndex, 1, prevState[hoverIndex]);
                return copiedState;
            });
        }
    };

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.taskColumnName === columnName) // Match taskColumnName
            .map((item, index) => (
                <MovableItem
                    id={item.id}
                    key={item.id}
                    name={item.taskName}
                    currentColumnName={item.taskColumnName}
                    setItems={setItems}
                    index={index}
                    moveCardHandler={moveCardHandler}
                    getAllTasks={getAllTasks}
                    items={items}
                />
            ));
    };
    const handleAddTask = () => {
        if (!taskName.trim()) {
            showNotification("Task name cannot be empty!", "error");
            return;
        }
        setItems((prevState) => {
            // Find the highest ID in the existing tasks
            const lastId = prevState.length > 0 ? Math.max(...prevState.map(item => item.id)) : 0;
            // Create new task with incremented ID
            const newTask = {
                id: lastId + 1,
                taskName: taskName,
                taskStatus: "Do it",
                taskColumnName: "Do it"
            };
            saveTask(newTask).then((res)=>{
               if(res.status && res.status===200){
                   showNotification(res.message,"success")
                   getAllTasks();
               }
               else throw res
            }).catch((error)=>{
                showNotification(error.error,'error')
                // console.log(error)
            })
            return [...prevState, newTask];
        });

        setTaskName(""); // Clear input after adding
    };

    const getAllTask = () =>{
        getAllTasks().then((res)=>{
            if (res.status && res.status===200){
                setItems(res.data)
            }
            else throw res
        }).catch((error)=>{
            showNotification(error.error,'error')
            // console.log(error)
        })
    }
    // Use useEffect to see the updated state
    useEffect(() => {
        getAllTask();
    }, []);  // Runs every time 'items' state updates
    return (
        <>
            <div>
                <div className="text-field">
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)} // Update state
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
                <div className="container">
                    {Object.values(COLUMN_NAMES).map((column) => (
                        <Column key={column} title={column} className="column">
                            {returnItemsForColumn(column)}
                        </Column>
                    ))}

                </div>
            </div>
        </>

    );
};

export default ManageTask;

