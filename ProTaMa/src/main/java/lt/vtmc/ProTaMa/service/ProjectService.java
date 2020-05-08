package lt.vtmc.ProTaMa.service;

import java.util.List;

import lt.vtmc.ProTaMa.model.Project;

public interface ProjectService {
	
	List<Project> getAllProjects();
	Project createProject(Project project);
	Project updateProject(Long projectId, Project project);
	void deleteProject(Long id);
	Project findById(Long id);
	List<Project> searchProject(String projectTitle);
	
	

}
