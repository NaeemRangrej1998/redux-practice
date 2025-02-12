import Backdrop from '@mui/material/Backdrop';
import React from 'react';

const BlockLoader = ({ isLoading, style, background }) => {
  return (
    <Backdrop
      sx={{
        position: 'absolute',
        background: background || '#e1e1e1',
        color: '#000',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      style={{
        opacity: 0.6,
        ...style,
      }}
      open={isLoading}
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

export default BlockLoader;
