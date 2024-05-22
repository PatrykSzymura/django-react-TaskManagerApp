import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';

const CreateTeam = () => {
    const [personData, setPersonData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState();
    const [allChecked, setAllChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await axios.get('http://localhost:8000/api/teams');;
          setPersonData(data["employess"]);
  
          if (data["teams"].length == 0) {
            data["teams"].push(1);
          } else {
            data["teams"].push(data["teams"][data["teams"].length - 1] + 1);
          }
  
          setTeamData(data["teams"]);
        } catch (error) {
          console.error("Error fetching teams data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      setPersonData((prevData) =>
        prevData.map((person) => ({ ...person, isChecked: allChecked }))
      );
    }, [allChecked]);
  
    // useEffect(() => {}, [selectedTeam]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        // const selected = personData.filter((person) => person.isChecked);
  
        const peopleForSave = {
          people: personData,
          teamId: selectedTeam,
        };
  
        const res = await fetch("/api/v1/team/add_to_team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(peopleForSave),
        });
  
        const data = await res.json();
        setPersonData(data["people"]);
  
        if (data.success === false) {
          setError(data.message);
        } else {
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const updatedId = e.target.id;
      setPersonData((prevData) =>
        prevData.map((person) =>
          person.Id == updatedId
            ? { ...person, isChecked: !person.isChecked }
            : person
        )
      );
    };
  
    const handleChangeAll = (e) => {
      setAllChecked(!allChecked);
    };
  
    const handleSelect = async (e) => {
      setSelectedTeam(e.target.value);
  
      const objSend = {
        persons: personData,
        teamId: e.target.value,
      };
      const res = await fetch("/api/v1/team/check_presence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objSend),
      });
  
      const data = await res.json();
  
      setPersonData(data["people"]);
    };
  
    return (
      <>
        <div className=''>
          <form className='' action='' onSubmit={handleSubmit}>
            <p className='text-3xl text-center font-semibold my-7'>
              Manage Teams
            </p>
            <div className='grid grid-cols-2'>
              <select
                id='person'
                className='select select-bordered col-span-2'
                onChange={handleSelect}
                required
              >
                <option disabled selected>
                  Select Team
                </option>
                {teamData.map((team, index) => (
                  <option key={team} value={team}>
                    {index === teamData.length - 1
                      ? `New Team ${team}`
                      : `Team ${team}`}
                  </option>
                ))}
              </select>
            </div>
            <hr className='py-2 border-none' />
  
            <table className='table '>
              {/*Kolumny tytulowe*/}
              <thead>
                <tr>
                  <th>
                    <input
                      type='checkbox'
                      className='toggle'
                      onChange={handleChangeAll}
                      checked={allChecked}
                    />
                  </th>
                  <th>Pracownik</th>
                  <th>Stanowisko</th>
                </tr>
              </thead>
              <tbody className='overflow-y-scroll'>
                {/*Rzedy*/}
                {Object.values(personData).map((person) => (
                  <tr key={person.Id} className='odd:bg-gray-500/20'>
                    <td>
                      <input
                        id={person["Id"]}
                        type='checkbox'
                        className='toggle'
                        onChange={handleChange}
                        checked={person.isChecked || false}
                      />
                    </td>
                    <td>
                      {person["Imie"]} {person["Nazwisko"]}
                    </td>
                    <td>{person["Stanowisko"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='btn btn-accent w-full'>Confirn Changes</button>
          </form>
        </div>
      </>
    );
  };
  export default CreateTeam;