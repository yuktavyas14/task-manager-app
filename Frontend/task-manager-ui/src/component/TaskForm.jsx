import {useEffect, useState} from "react";
import {createTask, updateTask} from "../services/taskService.js";
import {toast} from "react-toastify";

function TaskForm({ closeModal, onTaskCreated,selectedTask }) {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
        status: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (selectedTask) {
            setFormData({
                title: selectedTask.title || "",
                description: selectedTask.description || "",
                priority: selectedTask.priority || "",
                status: selectedTask.status || ""
            });
        }

    }, [selectedTask]);

    const handleSubmit = async () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.priority) {
            newErrors.priority = "Priority is required";
        }

        if (!formData.status) {
            newErrors.status = "Status is required";
        }
        setErrors(newErrors);

        // 3. STOP IF ERRORS EXIST
        if (Object.keys(newErrors).length > 0) return;
        try {
            if (selectedTask) {

                await updateTask(selectedTask.id, formData);
                toast.success("Task updated successfully!");

            }

            // CREATE TASK
            else {

                await createTask(formData);
                toast.success("Task add successfully!");

            }


            setFormData({
                title: "",
                description: "",
                priority: "",
                status: ""
            });

            onTaskCreated?.();   // safe call
            closeModal();        // close modal properly

        } catch (error) {
            console.log("Error saving task", error);
        }
    };

    return (
        <>
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title"> {selectedTask ? "Edit Task" : "Add Task"}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                            ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            <label>
                                Title <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control mb-2 ${errors.title ? "is-invalid" : ""}`}
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />

                            <label>
                                Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                                className={`form-control mb-2 ${errors.description ? "is-invalid" : ""}`}
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />


                            <label>
                                Priority <span className="text-danger">*</span>
                            </label>
                            <select
                                className={`form-control mb-2 ${errors.priority ? "is-invalid" : ""}`}
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="">Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>


                            <label>
                                Status <span className="text-danger">*</span>
                            </label>
                            <select
                                className={`form-control mb-2 ${errors.status ? "is-invalid" : ""}`}
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>

                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                Save Task
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* backdrop */}
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default TaskForm;