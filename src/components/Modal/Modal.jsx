import { createPortal } from 'react-dom';

import { Dialog, DialogContent, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Modal = ({onCloseModal, children, open=true}) => {
  return createPortal(
    <Dialog
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      maxWidth="sm"
      fullWidth
      onClose={onCloseModal}
      >
      <DialogContent>
        <IconButton 
          aria-label="Close modal button" 
          size="large" 
          onClick={onCloseModal} 
          sx={{ml: "auto", display: "block"}}
          >
          <HighlightOffIcon />
        </IconButton>
        {children}
      </DialogContent>
    </Dialog>,
    document.getElementById('modal-root')
  )
}

export default Modal