import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import Footer from './components/Footer';
import HomePage from './container/HomePage';
import LoginModal from './components/LoginModal'
import { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import axios from "axios"
import Cookies from 'js-cookie';
import Registration from './components/Registration'
import {ProductListingProvider} from './components/ContextApi'

function  App() {
  document.title = 'JobDay.az'
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: "red",
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
    const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  
  
  const handleOpen2 = () => {
      setOpen2(true);
  };
  const handleClose2 = () => {
      setOpen2(false);
  };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [LoginUserData, setLoginUserData] = useState([0])
    

  return (
    <ProductListingProvider>
    <Router>
        <div className="App">

        <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto",backgroundColor:"rgba(0,0,0,0.5)",}}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<LoginModal modalOpener={handleOpen2} modalCloser={handleClose} LoginUserData={LoginUserData} setLoginUserData={setLoginUserData}/>}
        </Modal>

        <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto",backgroundColor:"rgba(0,0,0,0.5)",}}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<Registration close={handleClose2}/>}
        </Modal>
        
        <Switch>
          <Route path="/">
            <HomePage handleOpen2={handleOpen2} handleOpen={handleOpen}  setLoginUserData={setLoginUserData} userData={LoginUserData !== undefined && LoginUserData} modalOpener={handleOpen}/>        
          </Route>
        </Switch>
        
        

      </div>
      </Router>
    </ProductListingProvider>

  );
}

export default App;
