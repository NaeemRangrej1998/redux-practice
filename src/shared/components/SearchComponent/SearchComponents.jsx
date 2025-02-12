import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Paper, TextField, InputAdornment } from '@mui/material';
import './SearchComponents.scss';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Skeleton from "@mui/material/Skeleton";

function SearchComponent({ onSearch, onSearchChange, onClear, placeholder, loading }) {
  const [searchText, setSearchText] = useState('');

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
    if(onSearchChange) {
      onSearchChange(event.target.value)
    }
  };

  const handleClear = () => {
    setSearchText('');
    onClear();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(searchText);
    }
  };

  return (
    <Paper component="form" className={'searchBar'}>
      {loading ?
        <Skeleton width={270} height={30} component={'span'} className={'header-menu-loading'}/> :
        <TextField
          value={searchText}
          type="text"
          size="small"
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder || "Search keyword"}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearchOutline/>
              </InputAdornment>
            ),
            endAdornment: searchText?.length > 0 && (
              <InputAdornment position="end" className={'cursor closeIcon'}>
                <IconButton onClick={handleClear}>
                  <CloseIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      }
    </Paper>
  );
}

export default SearchComponent;
