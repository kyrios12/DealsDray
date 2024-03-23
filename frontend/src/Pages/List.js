import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import '../Styles/List.css';

const List = () => {
    const [user, setUser] = useState([]);
    const [formedit,setFormEdit] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/');
            const data = await response.json();
            setUser(data.users);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (Id) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/${Id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
              setUser(data.users);
        } catch (error) {
            console.error(error);
        }
    }
    const handleEdit = async (Id) =>{
        
        navigate(`/edit-employee/${Id}`)
    }
    // console.log(formedit)
    return (
        <>
            <table className='employee_table'>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        {/* <th>Image</th> */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length >0 ? (
                        user.map((item, index) => (
                            <tr key={index}>
                                {Object.keys(item).map((key, index) => (
                                    <td key={index}>
                                        {Array.isArray(item[key]) ? item[key][0] : item[key]}
                                    </td>
                                ))}
                                <td>
                                    {/* Problem in delete */}
                                    <button onClick={()=>handleEdit(item._id)}>edit</button>
                                    <button onClick={() => handleDelete(item._id)}>delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default List;
