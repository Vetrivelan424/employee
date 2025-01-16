import React from 'react'
import { Outlet} from 'react-router-dom';

// components
import SettingsLeftMenu from './SettingsLeftMenu';

function SettingsBase() {
    return (
        <div className='row d-flex justify-content-between fade-in'>
          <div className='col-lg-3 col-xl-2 col-md-4 col-sm-5'>
          <SettingsLeftMenu />
          </div>
          <div className='col-lg-9 col-xl-10 col-md-8 col-sm-7'>
            <Outlet />
            </div>
        </div>
    );
}

export default SettingsBase