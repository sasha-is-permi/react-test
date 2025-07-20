import React from 'react';
import { Task } from '../types/task';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { TaskItem } from './TaskItem';

type FilterType = 'all' | 'active' | 'completed';

interface Props {
  tasks: Task[];
  filter: FilterType;
  onToggle(id:string): void;
  onDelete(id:string): void;
  onEdit(id:string, text:string): void;
}

export function TaskList({ tasks, filter, onToggle, onDelete, onEdit }: Props) {
  let filtered = tasks;
  if (filter === 'active') filtered = tasks.filter(t=>!t.completed);
  if (filter === 'completed') filtered = tasks.filter(t=>t.completed);

  if (!filtered.length)
    return <Paper sx={{p:2,textAlign:'center',color:'#888'}}>Нет задач</Paper>;

  return (
    <Paper elevation={3}>
      <List disablePadding>
        {filtered.map(task=>(
          <TaskItem key={task.id}
            task={task}
            onToggle={()=>onToggle(task.id)}
            onDelete={()=>onDelete(task.id)}
            onEdit={(text)=>onEdit(task.id,text)}
          />
        ))}
      </List>
    </Paper>
  );
}
