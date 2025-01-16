import React,{useEffect,useRef} from "react";
import router from './routes/mainRoutes';
import { RouterProvider,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import './assets/index.css';
import './assets/common.css';
import './assets/Animations/animations.css';
import './assets/icons/style.css';
import ToastNotification from "./genriccomponents/ToastNotification";
import ErrorBoundary from "./genriccomponents/errorBoundary";

import { fetchSession } from './reduxtoolbox/actions/authSlice';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
   if(localStorage.getItem('user_access_token')!==null){
    dispatch(fetchSession());
   }
  }, []);


  return (
    <>
      <ErrorBoundary>
       
        <RouterProvider router={router} />
        <ToastNotification />
      </ErrorBoundary>
    </>
  );
}

export default App;
