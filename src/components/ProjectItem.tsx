import { useDeleteProjectMutation } from "../app/services/api/projectsApi";

interface Props {
  id: string;
  title: string;
  urls: string[];
}

const ProjectItem = ({ id, title, urls }: Props) => {
  const [deleteProject] = useDeleteProjectMutation();

  async function handleDeleteProject() {
    await deleteProject(id)
  }
  return (
    <li className="flex justify-center">
      <div className="block min-w-full rounded-lg bg-white p-6 shadow-lg">
        <h5 className="mb-2 text-xl font-medium leading-tight text-gray-900">
          {title}
        </h5>
        <div className="mb-4 text-base text-gray-700">
          {urls.map((url: string, index) => {
            return <div key={index}>{url}</div>;
          })}
        </div>
        <button
          type="button"
          className=" inline-block rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
          onClick={handleDeleteProject}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProjectItem;
