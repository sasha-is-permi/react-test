import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loader() {
  return (
    <Box display="flex" justifyContent="center" my={4}>
      <CircularProgress />
    </Box>
  );
}