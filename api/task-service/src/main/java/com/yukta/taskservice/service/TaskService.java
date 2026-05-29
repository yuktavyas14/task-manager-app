package com.yukta.taskservice.service;


import com.yukta.taskservice.entity.Task;
import com.yukta.taskservice.exception.TaskNotFoundException;
import com.yukta.taskservice.repositiory.TaskRepositiory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepositiory taskRepositiory;

    public Task createTask(Task task){
        return taskRepositiory.save(task);
    }

    public List<Task> getTask(){
        return taskRepositiory.findAll();
    }

    public Task getTaskById(Long id){
        Optional<Task> task = taskRepositiory.findById(id);
        return task.orElse(null);
    }

    public Task updateTask(Long id, Task task) {

        Task existingTask = taskRepositiory.findById(id)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found with id: " + id));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        existingTask.setPriority(task.getPriority());

        return taskRepositiory.save(existingTask);
    }

    public void deleteTask(Long id){
         taskRepositiory.deleteById(id);

    }
}
