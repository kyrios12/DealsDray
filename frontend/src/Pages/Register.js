import React, { useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// Need to implement pop up messages for invalid username, password and validation to have setof rules like name should be more than 4 characters and password should be string and length greater than 6
const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8080/api/create',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username,password})
            });
            if(!response.ok){
                throw new Error('Failed to submit data');
            }
            console.log('Data submitted successfully')
            navigate('/login');
        }catch(err){
            console.error('Error submitting data:',err)
        }
        // console.log({ name, password }); 
    };
    const handleClick = ()=>{
        navigate('/login');
    }

    return (
        // <Link to='/api/create'>
        <div className='container'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Username:</label>
                <input
                    type='text'
                    placeholder='Name'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <label>Password:</label>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type='submit'>Register</button>
                <p onClick={handleClick}>Login?</p>
                {/* <button type='submit'></button> */}
            </form>
        </div>
        // </Link>
    );
};

export default Register;
