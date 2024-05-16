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
        <div>
            <h2>Project List</h2>
            {projects.map((project, index) => (
                <h3 key={index}>{project['project_name']}</h3>
            ))}
        </div>
    )
}

export default Projects;