package lt.vtmc.ProTaMa.service;

import java.util.List;
import lt.vtmc.ProTaMa.model.Task;

public interface TaskService {
	
	List<Task> getAllTasks();
	List<Task> getAllTasksByProjectId(Long projectId);
	Task createTask(Task task, Long projectId);
	Task updateTask(Task task, Long taskId);
	void deleteTask(Long taskId);
	Task findById(Long taskId);
	List<Task> getTasksINPROGRESS();
	List<Task> getTasksTODO();
	List<Task> getTasksDONE();
//	void updateTaskState(Long taskId, TaskState taskState);
//	Task updateTaskState(TaskState taskState, Long taskId);
	Task updateTaskINPROGRESS(Long taskId);
	Task updateTaskDONE(Long taskId);
	Task updateTaskTODO(Long taskId);
//	List<Task> searchTaskByTitle(String title);
//	List<Task> searchtTaskById(Long taskId);
	List<Task> searchTask(String input);
}
