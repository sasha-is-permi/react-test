import React, { useState } from 'react';
import { Task } from '../types/task';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const TaskText = styled.span<{completed:boolean}>`
  flex-grow:1;
  font-size:1.15rem;
  color:${p=>p.completed?'#888':'inherit'};
  text-decoration:${p=>p.completed?'line-through':'none'};
`;

const TaskRow = styled.li`
  display:flex;
  align-items:center;
  padding:.5rem .75rem;
  border-bottom:1px solid #eee;
`;

interface Props {
  task: Task;
  onToggle(): void;
  onDelete(): void;
  onEdit(text:string): void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  function handleSave() {
    if (value.trim() && value.trim() !== task.text) {
      onEdit(value.trim());
    }
    setEditing(false);
    setValue(task.text);
  }

  function handleCancel() {
    setEditing(false);
    setValue(task.text);
  }

  return (
    <TaskRow>
      <Checkbox checked={task.completed} onChange={onToggle} />
      {editing ? (
        <>
          <TextField size="small" value={value} onChange={e=>setValue(e.target.value)} sx={{flexGrow:1}} />
          <IconButton color="primary" onClick={handleSave}><SaveIcon /></IconButton>
          <IconButton color="secondary" onClick={handleCancel}><CloseIcon /></IconButton>
        </>
      ) : (
        <>
          <TaskText completed={task.completed}>{task.text}</TaskText>
          <IconButton color="primary" onClick={()=>setEditing(true)}><EditIcon /></IconButton>
                 <IconButton color="secondary" onClick={onDelete}><DeleteIcon /></IconButton>
        </>
      )}
    </TaskRow>
  );
}