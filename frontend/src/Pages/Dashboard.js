import React from 'react';
import '../Styles/dashboard.css'
import {useNavigate} from 'react-router-dom';


const DashBoard = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/employee')
    }
  return (
    <div className='dashboard'>
        {/* Navbar */}{/*Should contain  (Home button) (Employee list) (logout button)  */}
        <h1>DashBoard</h1>
        <button type='submit' onClick={handleClick}>Create Employee</button>
    </div>
  )
}

export default DashBoard