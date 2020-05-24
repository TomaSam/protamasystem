package lt.vtmc.ProTaMa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtmc.ProTaMa.model.Project;
import lt.vtmc.ProTaMa.model.ProjectStatus;
import lt.vtmc.ProTaMa.repository.ProjectRepository;

@Service
public class ProjectServiceImp implements ProjectService {
	
	@Autowired
	ProjectRepository projectRepository;

	@Override
	public List<Project> getAllProjects() {
		return projectRepository.findAll();
	}

	@Override
	public Project createProject(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public Project updateProject(Long projectId, Project project) {
		Project oldProject = findById(projectId);
		oldProject.setProjectTitle(project.getProjectTitle());
		oldProject.setProjectDescription(project.getProjectDescription());
		oldProject.setProjectStatus(project.getProjectStatus());
		return projectRepository.save(oldProject);
	}

	@Override
	public void deleteProject(Long id) {
		projectRepository.deleteById(id);
	}
	
	@Override
	public Project findById(Long id) {
		return projectRepository.findById(id).orElse(null);
	}

	@Override
	public List<Project> searchProject(String title) {
		List<Project> searchProject = new ArrayList<>();
		for (Project project : projectRepository.findAll()) {
			if (project.getProjectTitle().toLowerCase().contains(title)) {
				searchProject.add(project);
			}
		}
		return searchProject;
	}

	@Override
	public Project updateProjectCompleted(Long projectId) {
		Optional<Project> originalProject = projectRepository.findById(projectId);
		Project project = originalProject.get();
		project.setProjectStatus(ProjectStatus.COMPLETED);
		return projectRepository.save(project);
	}



}
