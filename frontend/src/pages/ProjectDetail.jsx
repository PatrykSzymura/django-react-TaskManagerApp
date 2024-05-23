import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, getPriorities, getTeam, getStatus } from "../utils/dataFeches";

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const [teamData, setTeamsData] = useState([]);
    const [priorityData, setPriData] = useState([]);
    const [statData, setStatData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedPriority, setSelectedPriority] = useState({});
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await getProject(params["project_id"]);
                const statusResponse = await getStatus();
                const prioResponse = await getPriorities();
                const TeamsResponse = await getTeam();
                setProject(projectResponse.data);
                setStatData(statusResponse.data);
                setPriData(prioResponse.data);
                console.log("responseebitch",prioResponse)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const loadData = async () => {
            await Promise.all([fetchData()]);
            if (
                project != null 
            ) {
                setDataLoaded(true);
            } else {
                setDataLoaded(false);
            }
        };

        loadData();
    }, [dataLoaded, params]);

      return dataLoaded ? <DataBar data={project} statusList={statData} priorityList={priorityData}/> : <label>Loading ...</label>
}

const DataBar = ({data, statusList, priorityList}) => {
    
    console.log("Databar Data",data)

    return (
        <>
        <div className="bg-primary grid grid-cols-10">
            <div className="text-2xl font-semibold">
                {data['project_name']}
            </div>
            <div className="font-semibold">Start Date : {data['date_start']}</div>
            <div className="font-semibold">End Date : {data['date_end']}</div>
            <div className="col-span-4"> <StatusBar proId={data['id']} currStat={data['status']} currPrio={data['priority']} statusList={statusList}/></div>
            
        </div>
        </>
    );
}

const StatusBar = ({proId, currStat,currPrio,statusList, priorityList}) => {
    const [formData, setFormData] = useState({});
    const [usedState, setUsedState] = useState(currStat);
    const [usedPriority, setUsedPriority] = useState(currPrio);

    const handleSubmit = async (e) => {};

    const handleChange = (e) => {
        if (e.target.id === "status") {
        setUsedState(e.target.value);
        setFormData({
            ...formData,
            projectId: proId,
            status: e.target.value,
        });
        console.log("formData",formData)
        return;
        } else if (e.target.id === "priorytet") {
        setUsedPriority(e.target.value);
        setFormData({
            ...formData,
            projectId: proId,
            priorytet: e.target.value,
        });
        console.log("formData",formData)
        return;
        }

        setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        projectId: proId,
        status: usedState,
        priorytet: usedPriority,
        });
    };

    useEffect(() => {
        setUsedState(currStat);
        setUsedPriority(currPrio);
        setFormData({
        ...formData,
        projectId: proId,
        status: currStat,
        priorytet: currPrio,
        });
    }, []);

    return (
        <div className="">
            <form action="">
            <div className="join join-horizontal">
                {statusList.map((st) => (
                    <input 
                        type="radio" 
                        id="status"
                        name="theme-buttons" 
                        className="btn theme-controller join-item" 
                        aria-label={st['status_name']} 
                        checked={st['id'] === usedState}
                        onChange={handleChange} 
                        value={st['id']}
                    />
                ))}
                {priorityList.map((st) => (
                    <input 
                        type="radio" 
                        id="status"
                        name="theme-buttons" 
                        className="btn theme-controller join-item" 
                        aria-label={st['status_name']} 
                        checked={st['id'] === usedState}
                        onChange={handleChange} 
                        value={st['id']}
                    />
                ))}
                <button className="btn btn-secondary theme-controller join-item">Apply</button>
            </div>
            </form>
        </div>

    );
}

export default ProjectDetail;