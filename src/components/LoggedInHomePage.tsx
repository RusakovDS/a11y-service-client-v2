import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProjectsQuery } from "../app/services/api/projectsApi";
import Projects from "./Projects";

const LoggedInHomePage = () => {
  const { data, isLoading, isError } = useGetProjectsQuery();

  function handleAddNewButton() {}

  return (
    <section className="container m-auto p-8">
      <h1 className="py-4 font-headings text-3xl font-bold sm:text-5xl ">
        Projects
      </h1>
      <div className="flex py-6">
        <button
          className="inline-block rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          onClick={handleAddNewButton}
        >
          <FontAwesomeIcon size="xl" icon={faPlus} /> Add new
        </button>
      </div>
      {/* Projects.tsx */}
      {isLoading ? (
        <div>Loading...</div>
      ) : data && data?.length > 0 ? (
        <Projects projects={data} />
      ) : (
        <div>No projects</div>
      )}
    </section>
  );
};

export default LoggedInHomePage;
