import { Project } from "../app/types/project";
import ProjectItem from "./ProjectItem";

interface Props {
  projects: Project[];
}

const Projects = ({ projects }: Props) => {
  return (
    <ul className="grid grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-3">
      {projects.map((project: Project) => {
        return (
          <ProjectItem {...project} key={project.id}/>
        );
      })}
    </ul>
  );
};

export default Projects;
