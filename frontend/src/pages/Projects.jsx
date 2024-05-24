import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"
import { getProjectsApi  } from "../utils/dataFeches";
import AddProjectForm from "./forms/AddProjectForm";

const AddProject = () => {
    return (
      
        <div className='card  bg-base-300 shadow-xl skeleton h-auto'>
          <div className='card-body'>
            <h2 className='card-title badge badge-lg w-5/6 h-6'></h2>
            <p className='badge badge-lg w-24 h-6'></p>
            <p className='badge badge-lg w-48 h-6'></p>
            <p className='badge badge-lg w-48 h-6'></p>
            <span className='absolute font-bold text-4xl m-auto  top-20 left-0 right-0'>
              NEW
            </span>
            <div className='card-actions '>
              <span className={`badge badge-lg  text-gray-700 w-24`}></span>
              <span className={`badge badge-lg  text-gray-700 w-24`}></span>
            </div>
          </div>
        </div>
    );
  };

const ProjectCard = ({data}) =>{
    const {
        id,
        team_id,
        description,
        priority,
        project_name,
        status,
        date_end,
        date_start,
      } = data;

    //console.log(data)
    return (
        <div className='h-auto'>
          <Link to={`/projects/${id}`}>
            <div className='p-1 h-full'>
              <div className='card w-full bg-base-300 shadow-xl '>
                <div className='card-body'>
                  <h2 className='card-title'>{project_name}</h2>
                  <p className=''>{`Przypisany zespół: ${team_id}`}</p>
                  <p className=''>{`Start: ${date_start}`}</p>
                  <p className=''>{`Przewidywany koniec: ${date_end}`}</p>
                  <div className='card-actions '>
                    <span
                      className={`badge badge-lg bg-${"primary"} text-white strokeme2 `}
                    >
                      {status}
                    </span>
                    <span
                      className={`badge badge-lg bg-${"primary"} strokeme2`}
                    >
                      {priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
        
    
}

const Projects = () => {
    let [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);
    
    let getProjects = async () => {
        try {
            let response = await getProjectsApi();
            let data = response.data;
            console.log('Data:', data);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-base-100 p-2 grid grid-cols-4 ">
            {projects.map((project, index) => (
                <ProjectCard data = {project}/>
            ))}
            <Modal
              element={<AddProjectForm/>}
              btn_Name={<AddProject />}
              btn_Style={' mx-2 my-1 h-auto'}
              modal_ID={"add project"}
            />
            
        </div>
    )
}

export default Projects;