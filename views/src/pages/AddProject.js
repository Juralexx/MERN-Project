import React from 'react';
import AddProjectForm from '../components/project/add-project/AddProjectForm';

const AddProject = () => {
  return (
    <div className="w-[100%] min-h-[100vh] pt-7 mx-auto flex flex-col items-center bg-background_light dark:bg-gradient-to-r from-background_primary to-background_primary_light">
      <div className="w-[800px]">
        <h1 className="text-3xl text-center text-gray-500 dark:text-white mb-9">Soumettre un projet</h1>
        <AddProjectForm />
      </div>
    </div>
  );
}

export default AddProject;