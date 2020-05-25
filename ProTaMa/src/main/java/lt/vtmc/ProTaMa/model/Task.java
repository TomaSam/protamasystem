package lt.vtmc.ProTaMa.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="task")
public class Task {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="taskId")
	private Long taskId;
	@Column(name="taskTitle")
	private String taskTitle;
	@Column(name="taskDescription")
	private String taskDescription;
	@Column(name="taskPriority")
	private TaskPriority taskPriority;
	@Column(name="taskState")
	private TaskState taskState;
	
	@Column(name="created", updatable = false)
	@CreationTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime created;
	@Column(name="updated")
	@UpdateTimestamp
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime updated;
	
	@ManyToOne
	@JoinColumn(name="projectId")
	private Project project;
	
	public Task() {
	}
	
	public Task(String taskTitle, String taskDescription, TaskPriority taskPriority, TaskState taskState, Project project) {
		this.taskTitle = taskTitle;
		this.taskDescription = taskDescription;
		this.taskPriority = taskPriority;
		this.taskState = taskState;
		this.project = project;
		
	}
	
	public Long getTaskId() {
		return taskId;
	}
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	public String getTaskTitle() {
		return taskTitle;
	}
	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}
	public String getTaskDescription() {
		return taskDescription;
	}
	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}
	public TaskPriority getTaskPriority() {
		return taskPriority;
	}
	public void setTaskPriority(TaskPriority taskPriority) {
		this.taskPriority = taskPriority;
	}
	public TaskState getTaskState() {
		return taskState;
	}
	public void setTaskState(TaskState taskState) {
		this.taskState = taskState;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public LocalDateTime getUpdated() {
		return updated;
	}

	public void setUpdated(LocalDateTime updated) {
		this.updated = updated;
	}
	
		
	
	

}
