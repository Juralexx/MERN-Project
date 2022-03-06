import React from 'react';
import AddProjectForm from '../components/project/add-project/AddProjectForm';

const AddProject = () => {
  return (
    <div className="w-[100%] min-h-[100vh] mx-auto flex flex-col items-center bg-white dark:bg-gradient-to-r from-background_primary to-background_primary_light">
      <div className="max-w-[800px]">
        <h1>Soumettre un projet</h1>
        <AddProjectForm />
      </div>
    </div>
  );
}

export default AddProject;