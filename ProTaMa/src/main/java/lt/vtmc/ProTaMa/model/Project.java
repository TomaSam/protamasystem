package lt.vtmc.ProTaMa.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.opencsv.bean.CsvBindByPosition;


@Entity
@Table(name="project")
public class Project {
	
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	@CsvBindByPosition(position = 0)
	@Column(name="projectId")
	private Long projectId;
	@CsvBindByPosition(position = 1)
	@Column(name="projectTitle")
	private String projectTitle;
	@CsvBindByPosition(position = 2)
	@Column(name="projectDescription")
	private String projectDescription;
	@CsvBindByPosition(position = 3)
	@Column(name="projectStatus")
	private ProjectStatus projectStatus;
	
	@JsonIgnore
	@OneToMany(mappedBy="project", fetch = FetchType.LAZY)
	private List<Task> tasks = new ArrayList<>();
	
	public Project() {
		
	}
	
	public Project(String projectTitle, String projectDescription, ProjectStatus projectStatus) {
		super();
		this.projectTitle = projectTitle;
		this.projectDescription = projectDescription;
		this.projectStatus = projectStatus;
	}
	
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
	public String getProjectTitle() {
		return projectTitle;
	}
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
	public String getProjectDescription() {
		return projectDescription;
	}
	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}
	
	public ProjectStatus getProjectStatus() {
		return projectStatus;
	}
	public void setProjectStatus(ProjectStatus projectStatus) {
		this.projectStatus = projectStatus;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
	public void addTask(Task task) {	
		this.tasks.add(task);
		task.setProject(this);
	}
	
	public void removeTask(Task task) {
		if (tasks.contains(task)) {
			this.tasks.remove(task);
		}
	}
	
//	public Integer countGeneralTasks() {
//		return tasks.size();
//	}
//	
//	public Integer countInProgressTasks() {
//		Integer counter = 0;
//		for (Task task : tasks) {
//			if (task.getTaskState().equals("INPROGRESS")) {
//				counter += 1;
//			}
//		}
//	return counter;
//	}
	
	

}
