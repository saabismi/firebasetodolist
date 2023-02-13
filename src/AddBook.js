// @ts-nocheck
import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

function AddBook(props) {

    const [open, setOpen] = useState(false);
    const [book, setBook] = useState({description: "", date: "", priority: "", });

    const handleOpen = () => {
        setOpen(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      }

      const handleSave = () => {
          props.addBook(book);
          handleClose();
      }

      const handleCancel = () => {
          setBook({description: "", date: "", priority: ""});
          handleClose();
      }

      const inputChanged = (event) => {
          setBook({...book, [event.target.name]: event.target.value});
      }

    return(
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add a new book
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add task info</DialogTitle>
                <DialogContent>
                <TextField 
                autoFocus 
                margin="dense" 
                name="author"
                value={book.author}
                label="Author" 
                onChange={inputChanged}
                type="text"
                fullWidth 
                />
                <TextField 
                margin="dense" 
                name="isbn"
                value={book.isbn} 
                label="ISBN"
                onChange={inputChanged}
                type="text" 
                />
                <TextField 
                margin="dense" 
                name="price"
                value={book.price} 
                label="Price"
                onChange={inputChanged}
                type="text" 
                />
                <TextField 
                margin="dense" 
                name="title"
                value={book.title} 
                label="Title"
                onChange={inputChanged}
                type="text" 
                />
                <TextField 
                margin="dense" 
                name="year" 
                value={book.year}
                label="Year" 
                onChange={inputChanged}
                type="text" 
                />
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={handleCancel}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default AddBook;