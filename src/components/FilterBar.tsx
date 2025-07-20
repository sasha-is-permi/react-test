import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

type FilterType = 'all' | 'active' | 'completed';

interface Props {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}

export function FilterBar({ filter, setFilter }: Props) {
  return (
    <ButtonGroup variant="outlined" sx={{ my:2 }}>
      <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>Все</Button>
      <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')}>Активные</Button>
      <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={() => setFilter('completed')}>Выполненные</Button>
    </ButtonGroup>
  );
}