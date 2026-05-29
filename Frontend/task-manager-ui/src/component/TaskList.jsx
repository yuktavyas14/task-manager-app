import {useEffect, useState} from "react";
import {deleteTask, getTasks} from "../services/taskService.js";
import {toast} from "react-toastify";

function TaskList({ refresh , openModal}) {

    const [tasks, setTasks] = useState([]);



    const loadTasks= async ()=>{
        const response = await getTasks();
        console.log("API RESPONSE:", response.data);
        setTasks(response.data);
    }

    const handleDelete = async (task) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if (!confirmDelete) return;

        try {

            await deleteTask(task.id);

            toast.success("Task deleted successfully!");

            loadTasks();

        } catch (error) {

            toast.error("Error deleting task");

        }
    };

    useEffect(() => {
        loadTasks();
    }, [refresh]);
    return (
        <div className="container-fluid mt-5">
            <div className="card shadow">
                <div className="card-body">

                    <h2 className="mb-4">Tasks</h2>

                    <table className="table table-dark table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>{tasks.length > 0 ? (tasks.map((task)=> (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"  onClick={() => openModal(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(task)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="4">No tasks found</td>
                            </tr>
                       )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default TaskList;