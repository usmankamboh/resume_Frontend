import React, { useState } from "react";
import axios from "axios";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "",
    phoneNo: "",
    address: "",
    githubLink: "",
    linkedInLink: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [personId, setPersonId] = useState(null);

  const handleInputChange = (field, value) => {
    if (error) {
      setError(""); 
    }
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== "");
  };

  const submitDetails = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setError('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3001/insertPInfo', formData);
      if (response.status === 200) {
        // Assuming the email is stored in formData under the key 'email'
        const response = await axios.get(`http://localhost:3001/personalInfo/${formData.email}`);
        if (response.status === 200 && response.data) {
          setPersonId(response.data.p_Id);
        } else {
          throw new Error('Failed to retrieve person ID');
        }
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError('Error saving data: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '50px' }}>
      <form className="row g-3" onSubmit={submitDetails}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="col-md-6" key={key}>
            <label htmlFor={key} className="form-label">
              {key.charAt(0).toUpperCase() + key.slice(1).replace("Link", " Link")}
            </label>
            <input
              type={key.includes("Link") ? "text" : key === "email" ? "email" : "text"}
              className="form-control"
              id={key}
              required
              placeholder={key.includes("Link") ? `https://${key}.com/username` : ""}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              disabled={isSubmitting} 
            />
          </div>
        ))}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="col-12">
          <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Submit Details
          </button>
          {personId && <div className="alert alert-success mt-3">Person ID: {personId}</div>}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
