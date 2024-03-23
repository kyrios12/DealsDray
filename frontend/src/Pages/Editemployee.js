import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const id = useParams();
    const nid = id.id;
    // console.log(id.id)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
    });

    

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? 
                checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value) :
                type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/admin/edit/${nid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            navigate('/users');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleClick = () => {
        navigate('/users');
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <label>
                        <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} />
                        Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} />
                        Female
                    </label>
                </div>
                <div>
                    <label>Course:</label>
                    <label>
                        <input type="checkbox" name="course" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} />
                        MCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} />
                        BCA
                    </label>
                    <label>
                        <input type="checkbox" name="course" value="BSC" checked={formData.course.includes('BSC')} onChange={handleChange} />
                        BSC
                    </label>
                </div>
                <div>
                    <label>Img Upload:</label>
                    <input type="file" name="image" onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
            <button type='button' onClick={handleClick}>Employee List</button>
        </div>
    );
};

export default Edit;
