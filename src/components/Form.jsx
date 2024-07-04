import React, { useState, useEffect } from "react";
import PersonalDetails from "./PersonalDetails";
import Skills from "./Skills";
import Experience from "./Experience";
import Project from "./Project";
import Education from "./Education";
import Resume from "./Resume";

const Form = () => {
  const [page, setPage] = useState(0);
  const FormTitles = ["Add Personal Details", "Add Skills", "Add Experience", "Add Project", "Add Education","Download Resume"];
  useEffect(() => {
    setPage(0);
  }, []);
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <PersonalDetails />;
      case 1:
        return <Skills />;
      case 2:
        return <Experience />;
      case 3:
        return <Project />;
      case 4:
        return <Education />;
      case 5:
          return <Resume />;
      default:
        return null;
    }
  };
  const handleNext = () => {
    if (page === FormTitles.length - 1) {
      console.log("Submitting Form...");
    } else {
      setPage(currPage => currPage + 1);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className="text-center">{FormTitles[page]}</h1>
      </div>
      <div>{PageDisplay()}</div>
      <div className="d-flex justify-content-center gap-3 py-5">
        <button disabled={page === 0}
          onClick={() => setPage(currPage => Math.max(0, currPage - 1))} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Prev
        </button>
        <button onClick={handleNext} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Form;
