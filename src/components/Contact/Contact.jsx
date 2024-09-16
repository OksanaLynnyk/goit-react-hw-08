
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { deleteContact, updateContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';

import { Box, Button, Grid2, Menu, MenuItem, Typography} from '@mui/material';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { alpha, styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const Contact = ({name, number, id}) => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [changeName, setChangeName] = useState(name);
  const [changeNumber, setChangeNumber] = useState(number);

  const onCloseModal = () => {
    setIsOpenModal(false);
    setIsEdit(false);
    setChangeName(name);
    setChangeNumber(number);
  };

  const onOpenModal = () => {
    setIsOpenModal(true);
    handleClose()
  }

  const onDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully🎉");
        onCloseModal()
      })
      .catch(error => {
        toast.error("Failed to delete contact: " + error.message);
      });
  };

  const onEdit = () => {
    dispatch(updateContact({ contact: { name: changeName, number: changeNumber }, contactId: id }))
    .unwrap()
    .then(() => {
      toast.success("Contact updated successfully🎉");
      onCloseModal();
    })
    .catch(error => {
      toast.error("Failed to update contact: " + error.message);
    });
  }

  const onToggleEdit = () => {
    setIsEdit(true); 
   handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 110,
      color: 'rgb(55, 65, 800)',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.info,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[300],
      }),
    },
  }));

  return (
    <Grid2 sx= {{ width: "grow", padding:2, backgroundColor:"rgba(205, 127, 50, 0.45)", borderRadius:2}}> 
      <DemoPaper square={false} sx={{width:'auto', display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ gap: 1 }}
          mb={1}
          >
          <PersonIcon />
          <Typography>{name}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{ gap: 1 }} 
          mb={1}
          >
          <PhoneIcon/>
          <Typography>{number}</Typography>
        </Box>
      </DemoPaper>

        <Button color='none'
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          fullWidth
          >
          Options
        </Button>
        <StyledMenu id="demo-customized-menu"
          MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          >
          <MenuItem onClick={onOpenModal} sx={{color:"rgba(47, 79, 79, 0.9)"}} >
            <DeleteIcon  />
            <Typography variant="body1" >Delete</Typography>
          </MenuItem>
          <MenuItem onClick={onToggleEdit} sx={{color:"rgba(47, 79, 79, 0.9)"}}>
            <ModeEditOutlineIcon />
            <Typography variant="body1" >Edit</Typography>
          </MenuItem>
        </StyledMenu>

        {isOpenModal && (
          <Modal
            onCloseModal={onCloseModal}
            onConfirm={onDeleteContact}
            >
              <Box marginTop={-1}   display="block" textAlign="center" >
                <Typography sx={{mb: 5}} variant="h5">Are you sure you want to delete this contact?</Typography>
                <Button sx={{mr: 5}} variant="contained" color="error" size="large" onClick={onCloseModal}>No</Button>
                <Button variant="contained" color="success" size="large" onClick={onDeleteContact}>Yes</Button >
              </Box>
          </Modal>
        )}

        {isEdit && (
          <Modal
            onCloseModal={onCloseModal}
            open={isEdit}
            >
              <Box marginTop={-1}   textAlign="center" >
                <Typography sx={{mb: 5}} variant="h5">Edit Contact</Typography>
                <TextField sx={{mr: 2}}
                  id="name"
                  variant="outlined"
                  type="text"
                  value={changeName}
                  onChange={(e) => setChangeName(e.target.value)}
                />
                <TextField sx={{mb: 5}} 
                  id="number"
                  variant="outlined"
                  type="tel"
                  value={changeNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setChangeNumber(value);
                    }
                  }}
                />
                <Button sx={{mr: 5}}variant="contained" color="error" size="large" onClick={onCloseModal}>Cancel</Button>
                <Button variant="contained" color="success" size="large" onClick={onEdit}>Save</Button>
              </Box>
          </Modal>
        )}
    </Grid2>
  );
}

export default Contact