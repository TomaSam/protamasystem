package lt.vtmc.ProTaMa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtmc.ProTaMa.model.Project;
import lt.vtmc.ProTaMa.model.Task;
import lt.vtmc.ProTaMa.model.TaskState;
import lt.vtmc.ProTaMa.repository.ProjectRepository;
import lt.vtmc.ProTaMa.repository.TaskRepository;

@Service
public class TaskServiceImp implements TaskService {
	
	@Autowired
	TaskRepository taskRepository;
	
	@Autowired
	ProjectRepository projectRepository;


//	public List<Task> getTaskByProjectId(Long projectId) {
//		List<Task> result = new ArrayList<>();
//		for(Task task : taskRepository.findAll()) {
//			if (task.getProject().getProjectId()==projectId) {
//				result.add(task);
//				return result;
//			}
//		}
//		return null;
//	}

	@Override
	public List<Task> getAllTasksByProjectId(Long projectId) {
		List<Task> result = new ArrayList<>();
		for (Task task : taskRepository.findAll()) {
			if (task.getProject().getProjectId() == projectId) {
				result.add(task);
			}
		}
		return result;
	}

	@Override
	public Task createTask(Task task, Long projectId) {
//		Project updatedProject = projectRepository.findById(projectId).get();
//		Task addTask = new Task(task.getTaskTitle(), task.getTaskDescription(), task.getTaskPriority(), task.getTaskState(), updatedProject);
//		taskRepository.save(addTask);
//		updatedProject.addTask(task);
//		projectRepository.save(updatedProject);
//		return addTask;
		projectRepository.findById(projectId).get().addTask(task);
		taskRepository.save(task);
		return task;
	}

	@Override
	public Task updateTask(Task task, Long taskId) {
		Task oldTask = findById(taskId);
		oldTask.setTaskTitle(task.getTaskTitle());
		oldTask.setTaskDescription(task.getTaskDescription());
		oldTask.setTaskPriority(task.getTaskPriority());
		oldTask.setTaskState(task.getTaskState());
		return taskRepository.save(oldTask);
//		Optional<Task> originalTask = taskRepository.findById(taskId);
//		return taskRepository.save(task);
	}

	@Override
	public void deleteTask(Long taskId) {
//		Project project = taskRepository.findById(id).orElse(null).getProject();
//		Task task = taskRepository.findById(id).get();
//		task.setProject(null);
//		taskRepository.save(task);
//		project.getTasks().removeIf(taske -> taske.getTaskId().equals(id));
//		projectRepository.save(project);
//		List<Task> list = new ArrayList<>();
//		for (Task task : list) { 
//			if (task.getProject().getProjectId() == projectId) {
//				list.add(task);
//			}
//		}
//		for (Task deletedTask : list) {
//			if (deletedTask.getTaskId() == id) {
//				taskRepository.delete(deletedTask);
//			}
//		}
		taskRepository.deleteById(taskId);
	}

	@Override
	public Task findById(Long id) {
//		for (Task task : getAllTasks()) {
//			if (task.getTaskId().equals(id))
//				return task;
//		}
//		return null;
		return taskRepository.findById(id).orElse(null);
	}

	@Override
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@Override
	public List<Task> getTasksINPROGRESS() {
		return taskRepository.findByTaskState(TaskState.INPROGRESS);
	}

	@Override
	public List<Task> getTasksTODO() {
		return taskRepository.findByTaskState(TaskState.TODO);
	}

	@Override
	public List<Task> getTasksDONE() {
		return taskRepository.findByTaskState(TaskState.DONE);
	}

//	@Override
//	public Task updateTaskState(TaskState taskState, Long taskId) {
//		Optional<Task> originalTask = taskRepository.findById(taskId);
//		Task task = originalTask.get();
//		task.setTaskState(taskState);
//		return taskRepository.save(task);
//	}

	@Override
	public Task updateTaskINPROGRESS(Long taskId) {
		Optional<Task> originalTask = taskRepository.findById(taskId);
		Task task = originalTask.get();
		task.setTaskState(TaskState.INPROGRESS);
		return taskRepository.save(task);
	}

	@Override
	public Task updateTaskDONE(Long taskId) {
		Optional<Task> originalTask = taskRepository.findById(taskId);
		Task task = originalTask.get();
		task.setTaskState(TaskState.DONE);
		return taskRepository.save(task);
	}

	@Override
	public Task updateTaskTODO(Long taskId) {
		Optional<Task> originalTask = taskRepository.findById(taskId);
		Task task = originalTask.get();
		task.setTaskState(TaskState.TODO);
		return taskRepository.save(task);
	}

	@Override
	public List<Task> searchTask(String input) {
		List<Task> searchTask = new ArrayList<>();
		try {
			Long taskId = Long.parseLong(input);
			Task task = this.findById(taskId);
			if (task != null)
				searchTask.add(task);
		}
		catch (NumberFormatException e) {}
		for (Task task : this.getAllTasks()) {
			if (task.getTaskTitle().toLowerCase().contains(input.toLowerCase()))
				searchTask.add(task);
		}
		return searchTask;
	}

//	@Override
//	public List<Task> searchTaskByTitle(String title) {
//		List<Task> searchTask = new ArrayList<>();
//		for (Task task : taskRepository.findAll()) {
//			if (task.getTaskTitle().toLowerCase().contains(title)) {
//				searchTask.add(task);
//			}
//		}
//			return searchTask;
//	}
//
//	@Override
//	public List<Task> searchtTaskById(Long taskId) {
//		List<Task> search = new ArrayList<>();
//		for (Task task : taskRepository.findAll()) {
//			if (task.getTaskId() == taskId) {
//				search.add(task);
//			}
//		}
//		return search;
//	}

	
	
	
	
	

}
