import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProject, getPriorities, getTeam, getStatus } from "../utils/dataFeches";
import axiosInstance from "../utils/axiosInstance";
import Modal from "../components/Modal";
import EditProjectForm from "./forms/EditProjectForm";

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const [priority, setPriority] = useState([]);
    const [status, setStatus] = useState([]);
    const [teamData, setTeamsData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedPriority, setSelectedPriority] = useState({});
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectResponse = await getProject(params["project_id"]);
                const PriorityResponse = await getPriorities();
                const StatusResponse = await getStatus();
                const TeamsResponse = await getTeam();
                setProject(projectResponse.data);
                setPriority(PriorityResponse.data);
                setStatus(StatusResponse.data);
                setTeamsData(TeamsResponse.data);
                console.log("responseBitch")
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        const loadData = async () => {
            await Promise.all([fetchData()]);
            if (
                project != null && priority != null && status != null
            ) {
                setDataLoaded(true);
            } else {
                setDataLoaded(false);
            }
        };

        loadData();
    }, [dataLoaded, params]);

      return dataLoaded ? <DataBar project={project} st={status} pr= {priority} /> : <label>Loading ...</label>
}

const DataBar = ({project,st,pr}) => {
    return (
        <>
        <div className="bg-primary grid grid-cols-10 gap-1 p-2">
            <div className="text-2xl font-semibold">
                {project['project_name']}
            </div>
            <div className="font-semibold">Start Date : {project['date_start']}</div>
            <div className="font-semibold">End Date : {project['date_end']}</div>
            <div className="col-end-11">
                <Modal element={<EditProjectForm/>} btn_Name={<FaCog />} btn_Style={"btn btn-base-200 text-3xl"} modal_ID={"Edit"}/>
            </div>
            
        </div>
        </>
    );
}

const StatusBar = ({ proId, currStat, currPrio, statusList, priorityList }) => {
    const [selectedPriority, setSelectedPriority] = useState(currPrio);
    const [selectedStatus, setSelectedStatus] = useState(currStat);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        status: currStat,
        priority: currPrio,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`change/projects/statusAndPriority/${proId}`, {
                status: formData.status,
                priority: formData.priority,
            });
            console.log('Update response:', response.data);
        } catch (error) {
            console.error('Error updating project', error);
            setError('Error updating project');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const intValue = parseInt(value, 10);

        if (id === "priority") {
            setSelectedPriority(intValue);
        } else if (id === "status") {
            setSelectedStatus(intValue);
        }

        setFormData({
            ...formData,
            [id]: intValue,
        });

        console.log('formDataChange', formData);
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="join join-horizontal">
                <select
                    className="select select-bordered w-1/2 max-w-xs join-item"
                    id="status"
                    value={selectedStatus}
                    onChange={handleChange}
                >
                    <option disabled> Select New Status </option>
                    {statusList.map((stat) => (
                        <option
                            key={stat.id}
                            value={stat.id}
                        >
                            {stat.status_name}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered w-1/2 max-w-xs join-item"
                    id="priority"
                    value={selectedPriority}
                    onChange={handleChange}
                >
                    <option disabled> Select New Priority </option>
                    {priorityList.map((stat) => (
                        <option
                            key={stat.id}
                            value={stat.id}
                        >
                            {stat.priority_name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="btn btn-base-200 join-item">Apply</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};


export default ProjectDetail;