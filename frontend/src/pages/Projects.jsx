import React , {useState, useEffect} from "react";
import Modal from "../components/Modal"
import axios from 'axios';
import AddProjectForm from "./forms/AddProjectForm";

const AddProject = () => {
    return (
      
        <div className='card w-96 bg-base-300 shadow-xl skeleton'>
          <div className='card-body'>
            <h2 className='card-title badge badge-lg w-72 h-6'></h2>
            <p className='badge badge-lg w-24 h-6'></p>
            <p className='badge badge-lg w-48 h-6'></p>
            <p className='badge badge-lg w-48 h-6'></p>
            <span className='absolute font-bold text-4xl m-auto  top-20 left-0 right-0'>
              NEW
            </span>
            <div className='card-actions '>
              <span className={`badge badge-lg  text-gray-700 w-24`}></span>
              <span className={`badge badge-lg  text-gray-700 w-24`}> </span>
            </div>
          </div>
        </div>
    );
  };

const Projects = () => {
    let [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);
    
    let getProjects = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/get/projects');
            let data = response.data;
            console.log('Data:', data);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-base-100 p-2 grid grid-cols-4">
                {projects.map((project, index) => (
                    <div key={index} className="card w-96 bg-base-300 shadow-xl">
                        <div className=" card-body">
                            <div className="card-title" >{project['project_name']}</div>
                            {project['description']}
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                ))}
            <Modal
              element={<AddProjectForm/>}
              btn_Name={<AddProject />}
              modal_ID={"add project"}
            />
            
        </div>
    )
}

export default Projects;