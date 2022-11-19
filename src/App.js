import React, { useEffect, useState, useRef } from 'react';
import './styles/App.css';

function App(props) {
  const { data } = props;
  const [projectsData, setProjectData] = useState([...data.projects]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortOption, setSortOption] = useState("default")
  const [sortIcon, setSortIcon] = useState("⏺️")

  const convertDate = (data) => {
    return new Date(data.postedDate.replaceAll(',', ''))
  }

  const handleSortDate = () => {
    switch(sortOption) {
      case "accending":
        setSortOption("decending")
        setSortIcon("🔽")
        var decendingDate = [...projectsData].sort((a, b) => convertDate(b) - convertDate(a))
        setProjectData(projectsData => decendingDate)
        break;
      case "decending":
        setSortOption("default")
        setSortIcon("⏺️")
        setProjectData(projectsData => data.projects)
        break;
      default:
        setSortOption("accending")
        setSortIcon("🔼")
        var accendingDate = [...projectsData].sort((a, b) => convertDate(a) - convertDate(b))
        setProjectData(projectsData => accendingDate)
        break;
    }
  }

  const handleSelect = (check, selectedProject) => {
    // Checks to see if input checkbox is checked before adding or removing projects from a selected array in state.
    var findProject = projectsData.find(project => project.name === selectedProject.name)
    findProject.checked = check
    check ? setSelectedProjects(selectedProjects => [...selectedProjects , selectedProject]) : setSelectedProjects((selectedProjects) => selectedProjects.filter((project) => project.name !== selectedProject.name))
  }

  const handleSubmit = () => {
    // Checks to see if any projects are submitted and console logs selected projects. Alert error message if nothing is selected.
    selectedProjects.length > 0 ? console.log(selectedProjects) : alert("No projects selected");
  }

  return (
    <div className="App">
      <div className="container">
        <div className='caption'>
          <h1>Projects</h1>
        </div>
        <table>
          <TableHead
            handleSortDate={handleSortDate}
            sortIcon={sortIcon}
          />
          <TableBody
            tableData={projectsData}
            handleSelect={handleSelect}
          />
        </table>
        <div className="btn-container">
          <button onClick={handleSubmit} className='submit-button'>Submit</button>
        </div>
      </div>
    </div>
  );
}

const TableHead = ({handleSortDate, sortIcon}) => {
  return (
    <thead className='table-header'>
      <tr className='table-row secondary-text'>
        <th className="table-header-cell">Name</th>
        <th className="table-header-cell">type</th>
        <th className="table-header-cell">Casting Director</th>
        <th className="table-header-cell"><button className='sort-button secondary-text' type='button' onClick={handleSortDate} >Posted Date <span id='sort-icon'>{sortIcon}</span></button></th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData, handleSelect }) => {
  return (
    <tbody>
      {tableData.map((project, i) => {
        return (
          <TableRow
            project={project}
            handleSelect={handleSelect}
            key={i}
          />
        )
      })}
    </tbody>
  )
}

const TableRow = ({project, handleSelect}) => {
  const ref = useRef(null)

  const handleCheck = (selectedProject) => {
    handleSelect(ref.current.checked, selectedProject)
  }

  return (
    <tr className='table-row primary-text' key={project.i}>
      <td className='table-row-check'>
        <input ref={ref} type="checkbox" name='select' value={project.check ? project.check : false} onClick={() => {handleCheck(project)}} data-value={project} checked={project.checked} />
      </td>
      <td className='table-row-cell uppercase'>
        <div>{project.name}</div>
      </td>
      <td className='table-row-cell'>{project.type}</td>
      <td className='table-row-cell'>{project.castingDirector}</td>
      <td className='table-row-cell'>{project.postedDate}</td>
    </tr>
  )
}

export default App;
