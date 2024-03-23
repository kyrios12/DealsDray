import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import DashBoard from './Pages/Dashboard';
import Employee from './Pages/Employee';
import List from './Pages/List';
import Editemployee from './Pages/Editemployee'
import {Routes,Route} from 'react-router-dom';

function App() {
  // console.log(Id)
  return (
    <div className="App">
      {/* <h1>{Id}</h1> */}
    <Routes>
     <Route path='/' element = {<Register />}></Route>
     <Route path='/login' element = {<Login />}></Route>
     <Route path='/user' element = {<DashBoard />}></Route>
     <Route path='/employee' element = {<Employee />}></Route>
     <Route path='/users' element = {<List />}></Route>
     <Route path= {`/edit-employee/:id`} element = {<Editemployee />}></Route>
     </Routes>
    </div>
  );
}

export default App;
