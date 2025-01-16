import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SettingsLeftMenu() {
    const location = useLocation();
    const currentPath = location.pathname;
    const lastPath = currentPath.split('/').pop();

    return (
        <div className='settings-menu-card'>
            <p className='text-20 text-bold-700 mx-3'>Settings</p>
            <div className='settings-left-menu-items'>
                <Link to="/settings/authentication-log">
                    <ul>
                        <li className={`${lastPath=='authentication-log'?'settings-menu-active':'' } settings-menu  d-flex-center `}>
                            <span>Tracking Logs</span>
                            <i className='icon-Right'></i>
                        </li>
                    </ul>
                </Link>
                <Link to="/settings/activity-log">
                    <ul>
                        <li className={`${lastPath=='activity-log'?'settings-menu-active':'' } settings-menu  d-flex-center `}>
                            <span>Activity Logs</span>
                            <i className='icon-Right'></i>
                        </li>
                    </ul>
                </Link>
               
            </div>
        </div>
    );
}

export default SettingsLeftMenu;
