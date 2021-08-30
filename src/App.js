import './App.css';
import {ListRestaurants} from './Components/ListRestaurants';
import { SideMenu, ShowMenu } from './Components/SideMenu';

function App() {

  return (
    <div className="App">
      <div className = "menu">
        <span className = "sideMenuBtn" style = {{fontSize:"25px"}} onClick = {ShowMenu} >&#9776;</span>
        <SideMenu />
      </div>
      <ListRestaurants />
    </div>
  );
}

export default App;
