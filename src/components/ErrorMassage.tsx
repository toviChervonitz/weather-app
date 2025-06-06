import React from 'react'
import { AlertCircle} from 'lucide-react';
import { Box, Typography, Paper, Stack } from '@mui/material';


interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Paper
          elevation={4}
          sx={{
            backgroundColor: '#fdecea',
            border: '1px solid #f5c6cb',
            borderRadius: 2,
            padding: 3,
            maxWidth: 500,
            margin: '20px auto',
            textAlign: 'center'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <AlertCircle size={28} color="#d32f2f" />
            <Box>
              <Typography variant="h6" color="error" fontWeight="bold">
                שגיאה בטעינת הנתונים
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {message}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      );
}

export default ErrorMessage
