import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { MusicNote, AddCircleOutline, LibraryMusic } from '@mui/icons-material';

// Styling for the animated button hover effect
const StyledButton = styled(Button)({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

// Music note icon with bounce animation
const AnimatedMusicNote = styled(MusicNote)(({ theme }) => ({
  fontSize: '80px',
  color: '#d45ddf',
  animation: 'bounce 2s infinite',
}));

// Internal keyframe animations
const bounceAnimation = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const zoomInAnimation = `
  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default function ArtistHome() {
  return (
    <div
      className='screen-container'
      style={{
      
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Insert CSS keyframes for animations */}
      <style>
        {bounceAnimation}
        {fadeInAnimation}
        {zoomInAnimation}
      </style>

      {/* Welcome message */}
      <Box
        textAlign='center'
        padding={3}
        sx={{ animation: 'fadeIn 2s ease-in' }}
      >
        <Typography variant='h3' color='#d45ddf' gutterBottom>
          Welcome, Talented Artist!
        </Typography>
        <Typography variant='h6' color='white' gutterBottom>
          Create, Share, and Explore the World of Music.
        </Typography>

        {/* Animated music note */}
        <Box marginY={4}>
          <AnimatedMusicNote sx={{ animation: 'bounce 2s infinite' }} />
        </Box>
      </Box>

      {/* Main content */}
      

      {/* Extra music-related info section */}
      <Box padding={4} textAlign='center' sx={{ animation: 'fadeIn 2s ease-in' }}>
        <Typography variant='h5' color='white' marginY={2}>
          🎶 What would you like to do today? 🎶
        </Typography>
        <Typography variant='body1' color='white' marginY={2}>
          Whether you're here to upload your latest creation or explore the songs of other artists, we have everything you need to grow your musical career.
        </Typography>
      </Box>
    </div>
  );
}
