import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Skills.css';

function Skills() {
  const [formData, setFormData] = useState({
    skill_Id: "", 
    p_Id: ""     
  });
  const [skills, setSkills] = useState([]);
  const handleSkillChange = (event) => {
    setFormData({ ...formData, skill_Id: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/selectSkills', formData);
      if (response.status === 200) {
        console.log('Skills submitted successfully');
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/getAllSkills')
      .then(response => {
        console.log('Skills data retrieved successfully:', response.data.data);
        setSkills(response.data.data); 
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  return (
    <div className="skills-container">
    <form onSubmit={handleSubmit}>
      <select onChange={handleSkillChange} value={formData.skill_Id}>
        <option value="">Select a skill</option>
        {skills.map(skill => (
          <option key={skill.skill_Id} value={skill.skill_Id}>
            {skill.skill_Id} - {skill.skillName}
          </option>
        ))}
      </select>
      <div className="button-container">
        <button type="submit" className="submit-button">
          Submit Skill
        </button>
      </div>
    </form>
  </div>
  
  );
}

export default Skills;
