import React , {useState, useEffect} from "react";
import axios from 'axios';

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
        <div className="bg-secondary">
            <h2 className="text-5xl font-bold">Project List</h2>

                {projects.map((project, index) => (
                    <div key={index} className="card w-96 bg-base-100 shadow-xl">
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
        </div>
    )
}

export default Projects;