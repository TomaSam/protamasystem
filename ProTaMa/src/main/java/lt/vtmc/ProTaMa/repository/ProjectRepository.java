package lt.vtmc.ProTaMa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.vtmc.ProTaMa.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{
//	List<Project> findByProjectTitle(String projectTitle);


}
