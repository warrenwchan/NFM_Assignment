import React, { useState } from 'react';
import './styles/App.css';

function App(props) {
  const { data } = props;
  const [projectsData, setProjectData] = useState(data.projects);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleSortDate = () => {
    // Sorts date from earliest by earliest.
    var sortedDate = [...projectsData.sort((a, b) => new Date(a.postedDate.replaceAll(',', '')) - new Date(b.postedDate.replaceAll(',', '')))]
    setProjectData(projectsData => sortedDate)
  }

  const handleSelect = (e) => {
    // Checks to see if input checkbox is checked before adding or removing projects from a selected array in state.
    var check = e.target.checked;
    check ? setSelectedProjects(selectedProjects => [...selectedProjects , projectsData[e.target.value]]) : setSelectedProjects((selectedProjects) => selectedProjects.filter((project) => project.name !== projectsData[e.target.value].name))
  }

  const handleSubmit = () => {
    // Checks to see if any projects are submitted and console logs selected projects. Alert error message if nothing is selected.
    selectedProjects > 0 ? console.log(selectedProjects) : alert("No projects selected");
  }

  return (
    <div className="App">
      <div className="container">
        <div className='caption'>
          <h1>Projects</h1>
        </div>
        <table>
          <thead className='table-header'>
            <tr className='table-row secondary-text'>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">type</th>
              <th className="table-header-cell">Casting Director</th>
              <th className="table-header-cell"><button className='sort-button secondary-text' type='button' onClick={handleSortDate} >Posted Date</button></th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, i) => {
              return (
                <tr className='table-row primary-text' key={i}>
                  <td className='table-row-check'><input type="checkbox" name='select' value={i} onChange={handleSelect} data-value={project} /></td>
                  <td className='table-row-cell uppercase'><div>{project.name}</div></td>
                  <td className='table-row-cell'>{project.type}</td>
                  <td className='table-row-cell'>{project.castingDirector}</td>
                  <td className='table-row-cell'>{project.postedDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="btn-container">
          <button onClick={handleSubmit} className='submit-button'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
