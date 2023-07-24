import React from "react";
import "./EmployeeProjectListing.scss"
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddTaskForm from "../AddTasksForm/AddTaskForm";
import { Link } from "react-router-dom";
import { fetchProjects,deleteProject } from '../../Store/projectsSlice';
import { MdOutlineNotifications } from "react-icons/md";
import Notifications from "../NotificationDrawer/Notification";


function EmployeeProjectList() {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification,setNotification] = useState(false);
  const user = useSelector((state) => state.users.currentUser);

  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  console.log(projects,user);

  const handleCreateProjectClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  //logic
  const projectsForMember = projects.filter((project) => project.members.includes(user.id.toString()));

    console.log(projectsForMember);
  return (
    <div className="employeelandingpage">
        <div className="topsection">
        {/* <Notifications/> */}
    <MdOutlineNotifications color="white" />
    <div className="search-input">
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search" />
    </div>
    <MdOutlineNotifications size={25} color="teal" />
  </div>
    <div className="employee-table-container">
    
      <div className="employee-first">
        <h3 className="employee-title">
          <b>Project List</b>
          <h1>Hi,{user.username}</h1>
        </h3>
        <button className="employee-custom-button" onClick={handleCreateProjectClick}>
         Add task
        </button>
      </div>

      {/* <table className="employee-custom-table">
        <thead>
          <tr>
            <th className="employee-left">Project Name</th>
            <th className="employee-left">Status</th>
            <th className="employee-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="employee-left">Lulu International</td>
            <td className="employee-status-red">Not completed</td>
            <td className="employee-right"><Link to='/employeedashboard/task-detail' className="Link" >Viewtasks</Link></td>
          </tr>
          <tr>
            <td className="employee-left">IKEA</td>
            <td className="employee-status-green">Completed</td>
            <td className="employee-right"><Link to='/employeedashboard/task-detail' className="Link" >Viewtasks</Link></td>
          </tr>
          <tr>
            <td className="employee-left">Lulu International</td>
            <td className="employee-status-red">Not completed</td>
            <td className="employee-right"><Link to='/employeedashboard/task-detail' className="Link" >Viewtasks</Link></td>
          </tr>
          <tr>
            <td className="employee-left">Lulu International</td>
            <td className="employee-status-red">Not completed</td>
            <td className="employee-right"><Link to='/employeedashboard/task-detail' className="Link" >Viewtasks</Link></td>
          </tr>
        </tbody>
      </table> */}
  {projectsForMember.map((item)=>(<div>
<h1>{item.project_name}</h1>
  </div>))}
      {showPopup && (
        <div className="employee-popup-container">
          <div className="employee-popup-overlay" onClick={handlePopupClose} />
          <div className="employee-popup-content">
            <AddTaskForm />
          </div>
        </div>
      )}
    </div>
  
    </div>
  
  );
}

export default EmployeeProjectList;
