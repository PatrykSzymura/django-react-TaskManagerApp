import axiosInstance from "../utils/axiosInstance";
import { useState, useEffect } from "react";

export const CreateProject = () => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    
    const handleMinDateChange = (e) => {
        setMinDate(e.target.value);
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleMaxDateChange = (e) => {
        setMaxDate(e.target.value);
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
          team: e.target.id == "team" ? e.target.value : selectedTeam,
          priority: e.target.id == "priority" ? e.target.value : selectedPriority,
        });
      };

    return (
        <div className='main'>
          <h2 className='text-center font-bold text-lg'>Add New Project</h2>
          <hr className='py-2 border-none' />
    
          {/* Form-Main */}
          <form onSubmit={console.log("sub")} className='grid grid-cols-6 gap-2'>
            {/* Project-Name */}
            <input
              type='text'
              id='projectName'
              placeholder='ProjectName'
              className='input input-bordered col-span-6'
              required
              onChange={handleChange}
            />
    
            {/* Project-Team-Select */}
            <select
              id='team'
              className='select select-bordered col-span-3'
              value={selectedTeam}
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Team
              </option>
              {/*team list*/}
            </select>
    
            {/* Project-Priority-Select */}
            <select
              id='priority'
              className='select select-bordered col-span-3'
              value={selectedPriority}
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Priority
              </option>
              {/* priority list*/}
            </select>
    
            {/* Project-Text-Area */}
            <textarea
              id='description'
              className='textarea textarea-bordered col-span-6'
              placeholder='Decriprion'
              onChange={handleChange}
            />
    
            {/* Project-Date-Start */}
            <p className='text-right py-3'>Start Date</p>
            <input
              id='startDate'
              type='date'
              className='input input-bordered col-span-2'
              max={maxDate}
              value={minDate}
              placeholder='Start Date'
              required
              onChange={handleMinDateChange}
            />
    
            {/* Project-Date-End */}
            <p className='text-right py-3'>End date</p>
            <input
              id='endDate'
              className='input input-bordered col-span-2'
              type='date'
              placeholder='End Date'
              min={minDate}
              value={maxDate}
              required
              onChange={handleMaxDateChange}
            />
    
            {/* Project-Submit */}
            <button type='submit' className='btn btn-accent  col-span-6'>
              {loading ? "Loading..." : "Dodaj Projekt"}
            </button>
          </form>
        </div>
      );
}

export const CreateTeam = () => {}

export const DecriptionProject = () => {}

export const DescriptionTask = () => {}