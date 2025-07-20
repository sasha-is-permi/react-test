import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Props {
  onAdd(text:string): Promise<void>;
  loading?: boolean;
}

export function TaskForm({ onAdd, loading }: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Введите текст задачи');
      return;
    }
    setError('');
    await onAdd(text.trim());
    setText('');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={2}>
      <TextField
        fullWidth
        label="Новая задача"
        value={text}
        error={!!error}
        helperText={error}
        onChange={e => setText(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" variant="contained" disabled={loading}>Добавить</Button>
    </Box>
  );
}
