import React, { useState } from 'react';
import './Resume.css';
import html2pdf from 'html2pdf.js';

function Resume() {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);

    const fetchDetails = () => {
        Promise.all([
            fetch(`http://localhost:3001/getPDetails/${userId}`).then(response => response.json()),
            fetch(`http://localhost:3001/getPskills/${userId}`).then(response => response.json()),
            fetch(`http://localhost:3001/getPExperience/${userId}`).then(response => response.json()),
            fetch(`http://localhost:3001/getPProject/${userId}`).then(response => response.json()),
            fetch(`http://localhost:3001/getPEducation/${userId}`).then(response => response.json())
        ]).then(([details, skills, experience, projects, education]) => {
            if (details.length > 0) setUserDetails(details[0]);
            setSkills(skills.map(skill => skill.skillName));
            setExperience(experience);
            setProjects(projects);
            setEducation(education);
        }).catch(error => console.error('Error fetching data: ', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchDetails();
    };

    const generatePDF = () => {
        const element = document.getElementById('resume-content');
        const options = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    };

    return (
        <div className="App">
            {!userDetails ? (
                <form onSubmit={handleSubmit}>
                    <h6>Please Enter Your Person ID to Download Resume</h6>
                    <input
                        type="text"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="Enter Person ID"
                        style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Submit</button>
                </form>
            ) : (
                <div>
                    <div id="resume-content">
                        <header>
                            <h1>{userDetails.fullName}</h1>
                            <p>{userDetails.designation}</p>
                            <p>{userDetails.email}</p>
                            <p>{userDetails.phoneNo}</p>
                            <p>{userDetails.address}</p>
                            <p>{userDetails.githubLink}</p>
                            <p>{userDetails.linkedInLink}</p>
                        </header>
                        <main>
                            <section>
                                <h2 className="section">Skills</h2>
                        <div>
                            {skills.reduce((acc, skill, index) => {
                                if (index % 2 === 0) {
                                    acc.push([skill]);
                                } else {
                                    acc[acc.length - 1].push(skill);
                                }
                                return acc;
                            }, []).map((pair, index) => (
                                <div key={index} className="skill-row">
                                    {pair.map((skill, idx) => (
                                        <p key={idx} className="skill-item">• {skill}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                            </section>
                            <section>
                            <h2 className="section">Experience</h2>
                        <ul>
                            {experience.map((exp) => (
                                <li key={exp.exp_Id}>
                                    <strong>{exp.designation} - {exp.companyName}</strong>
                                    <p>{exp.timePeriod}</p>
                                    <p>{exp.jobDescription}</p>
                                </li>
                            ))}
                        </ul>
                            </section>
                            <section>
                            <h2 className="section">Projects</h2>
                        <ul>
                            {projects.map((proj) => (
                                <li key={proj.proj_Id}>
                                    <strong>{proj.projectTitle}</strong>
                                    <p>{proj.projectDetail}</p>
                                </li>
                            ))}
                        </ul>
                            </section>
                            <section>
                            <h2 className="section">Education</h2>
                        <ul>
                            {education.map((edu) => (
                                <li key={edu.edu_Id}>
                                    <strong>{edu.instituteName}</strong>
                                    <p>{edu.degreeTitle} - {edu.passingYear}</p>
                                </li>
                            ))}
                        </ul>
                            </section>
                        </main>
                    </div>
                    <button onClick={generatePDF} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Download PDF
                    </button>
                </div>
            )}
        </div>
    );
}

export default Resume;
