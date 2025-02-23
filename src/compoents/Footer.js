import React from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" fontWeight="bold">
              Job Hunt
            </Typography>
            <Typography variant="body2" color="textSecondary">
              © 2024 Your Company. All rights reserved.
            </Typography>
          </Grid>
          
          <Grid item>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item>
                <IconButton 
                  href="https://facebook.com" 
                  aria-label="Facebook"
                  color="primary"
                >
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton 
                  href="https://twitter.com" 
                  aria-label="Twitter"
                  color="primary"
                >
                  <Twitter />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton 
                  href="https://linkedin.com" 
                  aria-label="LinkedIn"
                  color="primary"
                >
                  <LinkedIn />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
