import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import './loader.scss';

const MainLoader = ({ isMain }) => {
  return (
    <Backdrop
      sx={{
        background: '#F8F9FC',
        color: '#000',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        left: isMain ? 0 : '215px',
      }}
      open={true}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="loading">
          <div className="loading_line_wrapper">
            <div className="loading_line">
              <div className="loading_line_inner loading_line_inner--1"></div>
              <div className="loading_line_inner loading_line_inner--2"></div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default MainLoader;
