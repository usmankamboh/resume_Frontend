import React, { useState } from 'react';

function Experience() {
    const [experiences, setExperiences] = useState([
        { companyName: '', designation: '', timePeriod: '', jobDescription: '' }
    ]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (index, event) => {
        const newExperiences = experiences.map((experience, expIndex) => {
            if (index === expIndex) {
                return { ...experience, [event.target.name]: event.target.value };
            }
            return experience;
        });
        setExperiences(newExperiences);
    };

    const submitExperience = async () => {
        const latestExperience = experiences[experiences.length - 1];
        if (!latestExperience.companyName || !latestExperience.designation || !latestExperience.timePeriod || !latestExperience.jobDescription) {
            alert('Please fill in all fields before adding.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/insertExperience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(latestExperience)
            });
            const responseData = await response.json();
            console.log(responseData);
            setIsSubmitted(true); 
        } catch (error) {
            console.error('Failed to submit experience:', error);
            alert('Failed to submit experience: ' + error.message);
        }
    };

    const handleAddExperience = () => {
        if (!isSubmitted) {
            alert('Please submit your current experience details first.');
            return;
        }
        setExperiences([...experiences, { companyName: '', designation: '', timePeriod: '',jobDescription: '' }]);
        setIsSubmitted(false);
    };

    return (
        <div style={{ margin: '20px', padding: '50px'}}>
            {experiences.map((experience, index) => (
                <div key={index} style={{ marginBottom: '30px', marginTop: index > 0 ? '20px' : '0px' }}>
                    <h5>Experience History</h5>
                    <input
                        type="text"
                        placeholder="Company Name"
                        name="companyName"
                        value={experience.companyName}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Designation"
                        name="designation"
                        value={experience.designation}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Time Period"
                        name="timePeriod"
                        value={experience.timePeriod}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                    />
                    <textarea
                        placeholder="Details"
                        name="jobDescription"
                        value={experience.jobDescription}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', height: '60px', padding: '10px' }}
                    />
                </div>
            ))}
            <button onClick={submitExperience} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Submit Experience
            </button>
            <button onClick={handleAddExperience} style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={!isSubmitted}>
                Add More Experience
            </button>
        </div>
    );
}

export default Experience;
