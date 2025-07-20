import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { useTasks } from './hooks/useTasks';
import { Loader } from './components/Loader';
import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const {
    data,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    isCreating,
    updating,
    deleting,
    refetch,
  } = useTasks();

  async function handleAdd(text:string) {
    await createTask(text);
  }

  async function handleToggle(id:string) {
    const task = data?.find(t=>t.id===id);
    if (task) await updateTask({id, updates:{completed:!task.completed}});
  }

  async function handleEdit(id:string, text:string) {
    await updateTask({id, updates:{text}});
  }

  async function handleDelete(id:string) {
    await deleteTask(id);
  }

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Paper elevation={4} sx={{p:{xs:2,sm:4}}}>
          <Typography variant="h4" align="center" gutterBottom>Список задач</Typography>
          <TaskForm onAdd={handleAdd} loading={isCreating} />
          <FilterBar filter={filter} setFilter={setFilter} />
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Box color="error.main" p={2}>Ошибка загрузки данных</Box>
          ) : (
            <TaskList
              tasks={data||[]}
              filter={filter}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
