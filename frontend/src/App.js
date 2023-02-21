import {Route,Routes} from 'react-router-dom'
import './App.css';

import CompletedTaskU from './user/CompletedTaskU';
import Login from './components/Login';
import Register from './components/Register';
import Home from './admin/Home';
import Customer from './admin/Customer';
import LoginUser from './userComponent/Login';
import UserHome from './user/Home'
import LoginDeveloper from './DevComponents/Login'
import DevelopeHome from './developer/Home'
import Developer from './admin/Developer';
import SingleTask from './components/SingleTask';
import AssignTask from './admin/AssignTask';
import CreateCustomer from './components/CreateCustomer';
import CreateDeveloper from './components/CreateDeveloper';
import DelDeveloper from './components/DelDeveloper';
import DelCustomer from './components/DelCustomer';
import RegisterUser from './userComponent/RegisterUser';
import RegisterDeveloper from './DevComponents/RegisterDeveloper';
import DeveloperTask from './DevComponents/DeveloperTask';
import DeveloperTaskDetails from './DevComponents/DeveloperTaskDetails';
import Task from './user/Task';
import DeleteUserTask from './userComponent/DeleteUserTask';
import SingleDeveloper from './components/SingleDeveloper';
// import NavbarT from './NavbarT';
import Ratings from './admin/Ratings';
import Rating from './Rating';
import PostRtaings from './components/PostRatings'
import UserTaskDetails from './userComponent/UserTaskDetails';
import SCard from './components/SCard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/rating" element={<Rating/>}/>
        <Route path ="/" element={<Login/>}/>
        <Route path ="/admin-register" element={<Register/>}/>
        <Route path='/admin-home' element={<Home/>}/>
        
        <Route path='/admin-customer' element={<Customer/>}/>
        <Route path='/create-customer' element={<CreateCustomer/>}/>
        <Route path='/del/user/:id' element={<DelCustomer/>}/>

        <Route path='/admin-developer' element={<Developer/>}/>
        <Route path='/create-developer' element={<CreateDeveloper/>}/>
        <Route path ='/deletedeveloper/:id' element={<DelDeveloper/>}/>
        <Route path='/dev/details/:id' element={<DeveloperTask/>}/>
        <Route path='/admin/dev/details/:id' element={<SingleDeveloper/>}/>
        <Route path = '/admin/dev/single/task/:id' element={<SCard/>}/>

        {/* ADMIN RATING PARAMS */}
        <Route path='/admin/rating' element={<Ratings/>}/>
        <Route path='/admin/post/rating' element={<PostRtaings/>}/>



        {/* TASK ROUTE IN ADMIN ROLES*/}
        <Route path='/singletask/:id' element={<SingleTask/>}/>
        <Route path='/assigntask/:id' element={<AssignTask/>}/>

        {/* USER ROUTES */}
        <Route path='/user' element={<RegisterUser/>}/>
        <Route path='/user/login' element={<LoginUser/>}/>
        <Route path='/user-home' element={<UserHome/>}/>
        <Route path='/user/all/task' element={<Task/>}/>
        <Route path='/user/single/task/:id' element={<UserTaskDetails/>}/>
        <Route path='/user/all/task/:id' element={<Task/>}/>
        <Route path='/user/single/task/complete/:id' element={<CompletedTaskU/>} />
        <Route path='/user/delete/task/:id' element={<DeleteUserTask/>}/>

        {/* DEVELOPER ROUTES */}
        <Route path='/developer' element={<RegisterDeveloper/>}/>
        <Route path='/developer/login' element={<LoginDeveloper/>}/>
        <Route path='/developer/home' element={<DevelopeHome/>}/>
        <Route path='/dev/task/details/:id' element={<DeveloperTaskDetails/>}/>

      </Routes>
    </div>
  );
}

export default App;
