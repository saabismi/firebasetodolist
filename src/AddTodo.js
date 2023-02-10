import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

function AddTodo(props) {

    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({description: "", date: "", priority: "", });

    const handleOpen = () => {
        setOpen(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      }

      const handleSave = () => {
          props.addTodo(todo);
          handleClose();
      }

      const handleCancel = () => {
          setTodo({description: "", date: "", priority: ""});
          handleClose();
      }

      const inputChanged = (event) => {
          setTodo({...todo, [event.target.name]: event.target.value});
      }

      function deleteCellRenderer(params) {
          let editingCells = params.api.getEditingCells();
          let isCurrentRowEditing = editingCells.some((cell) => {
              return cell.rowIndex === params.node.rowIndex;
          })
      }

    return(
        <div>

            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add a new task
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add task info</DialogTitle>
                <DialogContent>
                <TextField 
                autoFocus 
                margin="dense" 
                name="description"
                value={todo.description}
                label="Description" 
                onChange={inputChanged}
                type="text"
                fullWidth 
                />
                <TextField 
                margin="dense" 
                name="date"
                value={todo.date} 
                onChange={inputChanged}
                type="date" 
                />
                <TextField 
                margin="dense" 
                name="priority" 
                value={todo.priority}
                label="Urgency level" 
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

export default AddTodo;