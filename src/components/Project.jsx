import React, { useState } from 'react';

function Project() {
    const [projects, setProjects] = useState([
        { projectTitle: '',  projectDetail: '' }
    ]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (index, event) => {
        const newProjects = projects.map((project, expIndex) => {
            if (index === expIndex) {
                return { ...project, [event.target.name]: event.target.value };
            }
            return project;
        });
        setProjects(newProjects);
    };
    const submitProject = async () => {
        const latestProject = projects[projects.length - 1];
        if (!latestProject.projectTitle ||  !latestProject.projectDetail) {
            alert('Please fill in all fields before adding.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/insertProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    p_Id: null,
                    projectTitle: latestProject.projectTitle,       
                    projectDetail: latestProject.projectDetail
                })
            });
            const responseData = await response.json();
            console.log(responseData);
            setIsSubmitted(true); 
        } catch (error) {
            console.error('Failed to submit project:', error);
            alert('Failed to submit project: ' + error.message);
        }
    };

    const handleAddProject = () => {
        if (!isSubmitted) {
            alert('Please submit your current project details first.');
            return;
        }
        setProjects([
            ...projects,
            { projectTitle: '', projectDetail: '' }
        ]);
        setIsSubmitted(false);
    };
    return (
        <div style={{ margin: '20px' ,padding: '50px'}}>
            {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '30px', marginTop: index > 0 ? '20px' : '0px' }}>
                    <h5>Project Details</h5>
                    <input
                        type="text"
                        placeholder="Project Name"
                        name="projectTitle"
                        value={project.projectTitle}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                    />
                    <textarea
                        placeholder="Details"
                        name="projectDetail"
                        value={project.projectDetail}
                        onChange={(e) => handleChange(index, e)}
                        style={{ width: '100%', height: '60px', padding: '10px' }}
                    />
                </div>
            ))}
            <button onClick={submitProject} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Submit Project
            </button>
            <button onClick={handleAddProject} style={{ padding: '10px 20px', cursor: 'pointer' }} disabled={!isSubmitted}>
                Add More Project
            </button>
        </div>
    );
}

export default Project;
