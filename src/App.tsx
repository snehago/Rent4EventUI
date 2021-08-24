import './App.scss';
import { useEffect } from 'react';
import AppRouter from './App.route';
import {useSelector, useDispatch } from 'react-redux';
import {RootState} from './Redux/store';
import {SharedService} from './Services/SharedService';
import { login } from './Redux/reducers/AuthReducer';
import { User } from './Shared/Interfaces/User';
const sharedService = new SharedService(); 

function App() {
  
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=> state.auth.user);
  
  useEffect(() => {
    if(sharedService.isUserLoggedIn() &&  !user) {
      let tempUser: User =JSON.parse(sharedService.getUser());
      dispatch(login(tempUser));
    }
  },[user]);
  
  return (
      <div className="App">
        <AppRouter user= {user} ></AppRouter>
      </div>
  );
}

export default App;
