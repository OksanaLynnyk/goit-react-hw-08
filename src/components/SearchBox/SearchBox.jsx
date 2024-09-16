import { useDispatch, useSelector } from 'react-redux'

import { changeFilterName, changeFilterNumber } from '../../redux/filters/slice'
import {selectNameFilter, selectNumberFilter} from '../../redux/filters/selectors'

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterName = useSelector(selectNameFilter);
  const filterNumber =useSelector(selectNumberFilter);

  const combinedFilter = filterName || filterNumber;

  const handleFilter = (event) => {
    const value = event.target.value;
   
    if (isNaN(value)) {
      dispatch(changeFilterName(value));  
      dispatch(changeFilterNumber(''));   
    } else {
      dispatch(changeFilterNumber(value));
      dispatch(changeFilterName(''));   
    }
  };

  return (

      <AppBar position="static" sx={{backgroundColor: 'rgba(205, 127, 50, 0.9) ', boxShadow: 1, borderRadius: 2, maxWidth: 450, ml: 'auto', mr:'auto'}}>
        <Toolbar>
          <Typography>
            Find contact 
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={combinedFilter}
              onChange={handleFilter}
            />
          </Search>
        </Toolbar>
      </AppBar>

  );
}

export default SearchBox