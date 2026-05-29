
import TaskList from "../component/TaskList";
import Header from "./Header.jsx";
import {useState} from "react";
import TaskForm from "../component/TaskForm.jsx";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const reloadTasks = () => {
        setRefresh(prev => !prev);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    return (
        <>
            <Header openModal={() => setShowModal(true)} />

            <TaskList refresh={refresh} openModal={openEditModal}/>

            {showModal && (
                <TaskForm closeModal={() => setShowModal(false)}  onTaskCreated={reloadTasks}
                          selectedTask={selectedTask} />
            )}
        </>
    );
}

export default Dashboard;
