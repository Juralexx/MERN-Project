import React from 'react';
import AddProjectForm from '../components/project/AddProjectForm';

const AddProject = () => {
  return ( 
    <div className="container add-project-page">
      <div className="add-project-container">
        <h1>Soumettre un projet</h1>
        <AddProjectForm />
      </div>
    </div>
   );
}

export default AddProject;