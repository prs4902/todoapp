import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

const ToDoApp = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [buttonDisable, setButtonDisable] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
    if (event.target.value.trim() === '') {
      setButtonDisable(true);
      setError('Input cannot be empty or just whitespace');
    } else {
      setButtonDisable(false);
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      const newItem = { id: Date.now(), text: input.trim() }; // Create new item with unique ID
      setItems([...items, newItem]);
      setInput('');
      setButtonDisable(true);
      setError('');
    } else {
      setError('Input cannot be empty or just whitespace');
    }
  };

  const handleCheck = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id],
    });
  };

  const removeTask = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const updatedCheckedItems = { ...checkedItems };
    delete updatedCheckedItems[id];
    setItems(updatedItems);
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="App d-flex justify-content-center align-items-center" style={{ height: '100vh', padding: '1rem' }}>
      <div className="card text-center" style={{ width: '100%', maxWidth: '60rem', margin: 'auto', position: 'relative' }}>
        <div
          className="d-flex justify-content-center gradient"
          style={{
            color: 'white',
            height: '12rem',
            textAlign: 'center',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '1rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          <span>My ToDo</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="d-flex justify-content-center"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              marginTop: '-7rem'
            }}
          >
            <div className="card" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
              <div className="card-body">
                <TextField
                  id="standard-basic"
                  label="Enter Your Task Here!"
                  variant="standard"
                  name='inputField'
                  value={input}
                  fullWidth
                  style={{ marginBottom: '1rem' }}
                  onChange={handleChange}
                  error={!!error}
                  helperText={error}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type='submit'
                  disabled={buttonDisable} 
                  style={{ background: 'indianred' }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div
          className="d-flex justify-content-center"
          style={{
            padding: '1rem',
          }}
        >
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <List>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" disabled>
                      <ListItemText primary="Remove" primaryTypographyProps={{ style: { fontSize: '0.9rem', fontWeight: 'bold', color: 'black' } }} />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <ListItemText primary="Mark" primaryTypographyProps={{ style: { fontSize: '0.9rem', fontWeight: 'bold', color: 'black' } }} />
                  </ListItemIcon>
                  <ListItemText primary="Task" primaryTypographyProps={{ style: { textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: 'black' } }} />
                </ListItem>
              </List>
              <hr />
              <List>
                {items.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No items entered" style={{ textAlign: 'center' }} />
                  </ListItem>
                ) : (
                  items.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <IconButton onClick={() => { removeTask(item.id) }} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          sx={{
                            color: red[900],
                            '&.Mui-checked': {
                              color: red[900],
                            },
                          }}
                          checked={!!checkedItems[item.id]}
                          onChange={() => handleCheck(item.id)}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          checkedItems[item.id] ? <del>{item.text}</del> : item.text
                        }
                        style={{ textAlign: "center" }}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
