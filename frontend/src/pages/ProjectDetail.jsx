import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, getPriorities, getTeam } from "../utils/dataFeches";

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const [teamData, setTeamsData] = useState([]);
    const [priorityData, setPriData] = useState([]);
    const [statusData, setStatData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedPriority, setSelectedPriority] = useState({});
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const projectResponse = await getProject(params["project_id"]);
            const TeamsResponse = await getTeam();
            setProject(projectResponse.data)
          } catch (error) {
            console.error('Error fetching data', error);
          }
        };
    
        fetchData();
      }, []);
      console.log(project)
      return <DataBar data={project}/>
}

const DataBar = ({data, statusList, priorityList}) => {
    
    console.log(data)
    return (
        <>
        <div className="bg-primary grid grid-cols-10">
            <div className="text-2xl font-semibold">
                Bar
            </div>
            
        </div>
        </>
    );
}

const StatusBar = ({statusList}) => {
    return <div> Status Bar</div>
}

export default ProjectDetail;