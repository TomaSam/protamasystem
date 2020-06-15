package lt.vtmc.ProTaMa.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.ProTaMa.model.Project;
import lt.vtmc.ProTaMa.model.Task;
import lt.vtmc.ProTaMa.service.ExportCsv;
import lt.vtmc.ProTaMa.service.ProjectService;
import lt.vtmc.ProTaMa.service.TaskService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping
	public ResponseEntity<List<Project>> getAllProjects() {
		List<Project> allProjects = projectService.getAllProjects();
		if (allProjects.isEmpty()) {
			return new ResponseEntity<List<Project>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Project>>(allProjects, HttpStatus.OK);
	}
	
	@GetMapping(value="/{projectId}")
	public ResponseEntity<Project> getProjectById(@PathVariable("projectId") Long projectId) {
		Project project = projectService.findById(projectId);
		if (project == null) {
			return new ResponseEntity<Project>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Project> createProject(@RequestBody Project project) {	
		projectService.createProject(project);
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}
	
	@PutMapping(value="/{projectId}")
	public ResponseEntity<Project> updateProject(@PathVariable("projectId") Long projectId, @RequestBody Project project) {
		projectService.updateProject(projectId, project);
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	@DeleteMapping(value="/{projectId}")
	public ResponseEntity<Void> deleteProject(@PathVariable("projectId") Long projectId) {
		Project project = projectService.findById(projectId);
		if (project == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		projectService.deleteProject(projectId);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping(value="/searchproject")
	public ResponseEntity<List<Project>> searchProject(@RequestParam("search") String search) {
		List<Project> searchProjects = projectService.searchProject(search);
		if (searchProjects.isEmpty()) {
			return new ResponseEntity<List<Project>>(searchProjects, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Project>>(searchProjects, HttpStatus.OK);
	}
	
	@PatchMapping(value="/{projectId}/completed")
	public ResponseEntity<Project> updateProjectCompleted(@PathVariable("projectId") Long projectId) {
		Project newProject = projectService.updateProjectCompleted(projectId);
		return new ResponseEntity<>(newProject, HttpStatus.OK);
	}

/*	Tasks */
	
	@GetMapping(value="/tasks")
	public ResponseEntity<List<Task>> getAllTasks() {
		List<Task> allTasks = taskService.getAllTasks();
		if (allTasks.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(allTasks, HttpStatus.OK);
	}
	
	@GetMapping(value="/{projectId}/tasks")
	public ResponseEntity<List<Task>> getAllTasksById(@PathVariable Long projectId) {
		
		List<Task> allTasks = taskService.getAllTasksByProjectId(projectId);
		if (allTasks.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(allTasks, HttpStatus.OK);
	}
	
	@GetMapping(value="/tasks/{taskId}")
	public ResponseEntity<Task> getTaskByTaskId(@PathVariable("taskId") Long taskId) {
		Task newTask = taskService.findById(taskId);
		if (newTask == null) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Task>(newTask, HttpStatus.OK);
	}
	
//	Search methods for task
//	@GetMapping(value="/searchtaskid")
//	public ResponseEntity<List<Task>> searchTaskById(@RequestParam("search") Long taskId) {
//		List<Task> searchTask = taskService.searchtTaskById(taskId);
//		if (searchTask.isEmpty()) {
//			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
//		}
//		return new ResponseEntity<List<Task>>(searchTask, HttpStatus.OK);
//	}
	
	@GetMapping(value="/searchtask")
	public ResponseEntity<List<Task>> searchTask(@RequestParam("search") String search) {
		List<Task> searchTask = taskService.searchTask(search);
		if (searchTask.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(searchTask, HttpStatus.OK);
	}
	
	@PostMapping(value="/{projectId}/tasks")
	public ResponseEntity<Task> addTaskToProject(@PathVariable Long projectId, @RequestBody Task task) {
		taskService.createTask(task, projectId);
		return new ResponseEntity<Task>(task, HttpStatus.CREATED);
	}
	
//	@DeleteMapping(value="/{projectId}/tasks/{taskId}")
//	public ResponseEntity<Void> deleteTask(@PathVariable Long projectId, @PathVariable Long taskId) {
//		taskService.deleteTask(taskId);
//		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//	}
	
	@DeleteMapping(value="/tasks/{taskId}")
	public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
		taskService.deleteTask(taskId);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping(value="/tasks/{taskId}")
	public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) {
		taskService.updateTask(task, taskId);
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}
	
//Tasks List By State
	@GetMapping(value="/tasks/inprogress")
	public ResponseEntity<List<Task>> getTasksINPROGRESS() {
		List<Task> inProgressTasks = taskService.getTasksINPROGRESS();
		if (inProgressTasks.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(inProgressTasks, HttpStatus.OK);
	}
	
	@GetMapping(value="/tasks/todo")
	public ResponseEntity<List<Task>> getTasksTODO() {
		List<Task> todoTasks = taskService.getTasksTODO();
		if (todoTasks.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(todoTasks, HttpStatus.OK);
	}
	
	@GetMapping(value="/tasks/done")
	public ResponseEntity<List<Task>> getTasksDONE() {
		List<Task> doneTasks = taskService.getTasksDONE();
		if (doneTasks.isEmpty()) {
			return new ResponseEntity<List<Task>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Task>>(doneTasks, HttpStatus.OK);
	}
	
//	@PatchMapping(value="/tasks/{taskId}")
//	public ResponseEntity<Task> updateTaskState(@RequestParam("taskState") TaskState taskState, @PathVariable("taskId") Long taskId) {
//		Task newTask = taskService.updateTaskState(taskState, taskId);
//		return new ResponseEntity<>(newTask, HttpStatus.OK);
//	}
	
	@PatchMapping(value="/tasks/{taskId}/inprogress")
	public ResponseEntity<Task> updateTaskInprogress(@PathVariable("taskId") Long taskId) {
		Task newTask = taskService.updateTaskINPROGRESS(taskId);
		return new ResponseEntity<>(newTask, HttpStatus.OK);
	}
	
	@PatchMapping(value="/tasks/{taskId}/done")
	public ResponseEntity<Task> updateTaskDone(@PathVariable("taskId") Long taskId) {
		Task newTask = taskService.updateTaskDONE(taskId);
		return new ResponseEntity<>(newTask, HttpStatus.OK);
	}
	
	@PatchMapping(value="/tasks/{taskId}/todo")
	public ResponseEntity<Task> updateTaskTodo(@PathVariable("taskId") Long taskId) {
		Task newTask = taskService.updateTaskTODO(taskId);
		return new ResponseEntity<>(newTask, HttpStatus.OK);
	}
	
/*** Exporting Data to CSV	***/
	@GetMapping(value="/exportProjects", produces="text/csv")
	public void exportProjects(HttpServletResponse res) {
		try {
			new ExportCsv<Project>().exportDataToCsv(res.getWriter(), projectService.getAllProjects());
		}
		catch (Exception e) {
			
		}	
	}
	
	@GetMapping(value="/exportTasks/{projectId}", produces="text/csv") 
	public void exportTasks(HttpServletResponse res, @PathVariable("projectId") Long projectId) {
		try {
			new ExportCsv<Task>().exportDataToCsv(res.getWriter(), taskService.getAllTasksByProjectId(projectId));
		}
		catch (Exception e) {
			
		}	
	}
	
	

	
	


}
