import React from 'react';
import { Cloud, CloudSun } from 'lucide-react';
import { Box, Typography, Stack } from '@mui/material';


interface HeaderProps {
    lastUpdated?: Date;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated }) => {
    return (
        <Box textAlign="center" mb={6}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
            <CloudSun style={{ width: 48, height: 48, color: '#ffb300' }} />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              תחזית מסביב לעולם 
            </Typography>
          </Stack>
    
          <Typography variant="body1" color="text.secondary" mb={1}>
            עדכוני מזג אוויר בזמן אמת מכל רחבי העולם
          </Typography>
    
          {lastUpdated && (
            <Typography variant="caption" color="text.disabled">
              עודכן לאחרונה: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
        </Box>
      );
};

export default Header;