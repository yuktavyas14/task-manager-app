package com.yukta.taskservice.repositiory;


import com.yukta.taskservice.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepositiory extends JpaRepository<Task, Long> {
}
