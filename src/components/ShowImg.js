import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function ShowImg(props) {
  const { open, file, close } = props;

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Image Preview</DialogTitle>
      <DialogContent sx={{ minWidth: '300px', minHeight: '300px'}}>
        <img src={file} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
