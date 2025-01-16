import React,{useEffect,useRef,useState} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate,NavLink ,useLocation} from 'react-router-dom';
import DefaultImg from '../assets/Images/backgruonds/askdeep.png'
import tvsLogo from '../assets/Images/backgruonds/tvs_log_2.svg'
import tvsLogo1 from '../assets/Images/backgruonds/tvs_logo.png'
import Dummy   from '../assets/Images/backgruonds/askdeep.png'

import ScrollToTop from '../hooks/useTopScroll.js';
import AlertModal from '../genriccomponents/AlertModal.js';
import ReactTooltip from 'react-tooltip';
import Loader from '../genriccomponents/loaders/RedLoader.js';
const UserLayout = (props) => {
  const topDiv=useRef()
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  const [show,setShow] =useState(false)
  const [loader,setLoader] =useState(false);

  const currentPath = location.pathname;
  const lastPath = currentPath.split('/').pop();
  // Example of how to use these values in an API request header
  const headers = {
    osName: osInfo.name,
    osVersion: osInfo.version,
    browserName: browserInfo.name,
    browserVersion: browserInfo.version,
  };
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[navigate,location])

  const dropper = useRef();

  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropper?.current && !dropper?.current?.contains(event.target)) {
        setIsComponentVisible(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const [showModal,setShowModal] = useState(false)
  
  return (
    <div className='main-panels'>
     
       <ScrollToTop containerRef={containerRef} />
      
       <div className='d-flex'>
  
       <div className='user-panel-top d-flex justify-content-between'>
        <div>
        </div>
        <div>
  <p className='head-tittle'>Employees <span className='red-color'>Central</span> </p>
        </div>
        <div className="d-flex align-items-center justify-content-end height100" >
        <div id="menu" className={`btn-reset menu-toggle-container ${show ?'menu-toggle':'menu-transition'}`} onClick={(e) => {
                e.preventDefault();
                setShow(show ? false : true);
              }}>
                <span className="icon-menu-bar admin-icon-menu"></span>
              </div>   
                <div ref={dropper} onClick={() => setIsComponentVisible(!isComponentVisible)} className={isComponentVisible ? "profile-container d-flex align-items-center justify-content-end cursor-pointer  user-profile-header-clicker-active px-4" : "profile-container d-flex align-items-center justify-content-end user-profile-header-clicker cursor-pointer px-4"} >
                  <div className='d-flex align-items-end justify-content-center flex-column mt-2'>
                    <p className='m-0 me-3 user-name white-color text-17'>
                    <b>Jhon Doe</b>
                      </p>
                  <p className='m-0 me-3 user-role white-color'>
  Admin
</p>

                  </div>
                  <button className="ms-2 cs-icon-down d-flex align-items-center">
                    <div className="profile-img-container">
                    <img
                        className=" profile-img"
                        src={DefaultImg}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = Dummy;
                        }}
                        alt="profile img"
                        loading="lazy" // Use lazy loading for images
                        width="150" // Set appropriate width and height
                        height="150"
                     />                      
                    </div>
                    
                    
                    <div className="icon-down-arrow cs-icon-down  white-color"></div>
                   
                  </button>
                  
                </div>
              </div>
      </div>
      <div
      //  onMouseEnter={handleMouseEnter} 
      // onMouseLeave={handleMouseLeave}
        className={`user-aside-container ${show?'aside-toggle':''}`}>
     <div className='user-panel-left-logo-sm '>
      <img className={show?'show-container slide-in-left':'show-container-2 slide-in-left'} src={show ?tvsLogo:tvsLogo1} alt="TVSLogo" />
      </div>
      <ul>


<ReactTooltip id="menu-user" className="reacttooltip" type="dark" effect="solid" place="right" delayShow={parseInt("100")} resizeHide={Boolean(false)} />


  <li className='fade-in-right data-100'>
    <NavLink to="/customers" data-for="menu-user" data-tip={`${show? '' :'Employees'}`}  className={({ isActive }) => `menu-item-container d-flex align-items-center menu-item-container-toggle ${isActive ? 'dash-active' : ''}`} >
      <span className={`menu-item-i icon-customer`} ></span>  <span className={`${show? 'text-show typewriter ' :'text-hide'}`}>Employees</span>
    </NavLink>
  </li>
  

<li className='fade-in-right data-300'>
    <NavLink to="/settings/authentication-log" aria-current="page" data-for="menu-user" data-tip={`${show? '' :'Settings'}`}  className={({ isActive }) => `menu-item-container d-flex align-items-center menu-item-container-toggle ${isActive||lastPath=='activity-log'  ? 'dash-active' : ''}`}  >
      <span className="menu-item-i icon-Admin-users"></span> <span className={`${show? 'text-show typewriter ' :'text-hide'}`}>Settings</span>
    </NavLink>
  </li>

 
</ul>
      </div>
    
      <main className={`main-inside-container ${show ? 'main-inside-container-toggle':''}`} ref={topDiv}>
      {loader && <Loader/>}
      <Outlet />
    
      </main>
      </div>
      <footer className={`d-flex justify-content-between footer-container flex-wrap ${show ? 'footer-continer-toggle': ''}`}>
        <div> 
           <span className='footer-span text-14'>All rights reserved © 2024 TVS</span>
        </div>
        <div>
        <span className='footer-span text-14'>Privacy Policy | <span className=' text-14'>Terms Of Service</span> </span>
        </div>
        
      </footer>
     { showModal && 
      <AlertModal button={'Log Out'} showModal={showModal} setShowModal={setShowModal} title={"Log Out"} content={'Are you sure you want to Log out?'} handleOkay={handleLogoutOkay}/>
     }
      </div>
  );
};

export default UserLayout;
