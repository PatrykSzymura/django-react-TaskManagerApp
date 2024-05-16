import React , {useState, useEffect} from "react";

const Projects = () => {
    let [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects()
    },[]) 

    let getProjects = async () => {
       let response = await fetch('http://127.0.0.1:8000/api/projects/')
       let data = await response.json()
       console.log('Data:',data)
       setProjects(data)
    }

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