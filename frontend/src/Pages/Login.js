import React,{useState} from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { json } from 'express';
// Handle login failed error and Invalid user credentials error -> redirect back to register page
const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8080/api/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username,password})
            });
            // console.log(response.json()) 
            if(!response.ok){
                throw new Error('Failed to submit data');
            }else{
                localStorage.setItem('userId',json.user);
                localStorage.setItem('token',json.authToken)
            }
           

            // console.log(response)
            console.log('Logged in successfully')
            navigate('/user')   
        }catch(err){
            console.error('Error submitting data:',err)
        }
        // console.log({ name, password }); 
    };
  return (
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
                <button type='submit'>Login</button>
            </form>
    </div>
  )
}

export default Login