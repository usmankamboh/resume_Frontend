import React, { useState } from 'react';

function Education() {
  const [education, setEducation] = useState([
    { instituteName: '', degreeTitle: '', passingYear: '' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (index, event) => {
    const newEducation = education.map((edu, expIndex) => {
      if (index === expIndex) {
        return { ...edu, [event.target.name]: event.target.value };
      }
      return edu;
    });
    setEducation(newEducation);
  };

  const submitEducation = async () => {
    const latestEducation = education[education.length - 1];
    if (!latestEducation.instituteName || !latestEducation.degreeTitle || !latestEducation.passingYear) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/insertEducation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(latestEducation),
      });
      const responseData = await response.json();
      console.log(responseData);
      setIsSubmitted(true); // Reset "isSubmitted" after successful submission
    } catch (error) {
      console.error('Failed to submit education:', error);
      alert('Failed to submit education: ' + error.message);
    }
  };

  const handleAddEducation = () => {
    if (isSubmitted) {
      setEducation([...education, { instituteName: '', degreeTitle: '', passingYear: '' }]);
      setIsSubmitted(false);
    } else {
      alert('Please submit your current education details first.');
    }
  };

  return (
    <div style={{ margin: '20px', padding: '50px' }}>
      {education.map((edu, index) => (
        <div key={index} style={{ marginBottom: '30px', marginTop: index > 0 ? '20px' : '0px' }}>
          <h5>Education History</h5>
          <input
            type="text"
            placeholder="Institute Name"
            name="instituteName"
            value={edu.instituteName}
            onChange={(e) => handleChange(index, e)}
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
          />
          <input
            type="text"
            placeholder="Degree Title"
            name="degreeTitle"
            value={edu.degreeTitle}
            onChange={(e) => handleChange(index, e)}
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
          />
          <input
            type="text"
            placeholder="Passing Year"
            name="passingYear"
            value={edu.passingYear}
            onChange={(e) => handleChange(index, e)}
            style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
          />
        </div>
      ))}
      <button onClick={submitEducation} style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={isSubmitted}>
        Submit Education
      </button>
      <button onClick={handleAddEducation} style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={!isSubmitted}>
        Add More Education
      </button>
    </div>
  );
}

export default Education;
