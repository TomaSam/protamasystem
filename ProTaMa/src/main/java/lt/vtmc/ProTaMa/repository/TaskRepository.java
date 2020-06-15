package lt.vtmc.ProTaMa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import lt.vtmc.ProTaMa.model.Task;
import lt.vtmc.ProTaMa.model.TaskState;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByTaskState(TaskState taskState);
	
//	@Modifying
//	@Query("UPDATE Task t SET t.taskState=:taskState WHERE t.taskId=:taskId")
//	void updateTaskState(@Param("taskId") Long taskId, @Param("taskState") TaskState taskState);
	


}
