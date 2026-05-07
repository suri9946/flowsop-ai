import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import sopRoutes from './routes/sops';
import exportRoutes from './routes/export';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '4000', 10);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/sops', sopRoutes);
app.use('/export', exportRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});

server.on('error', (error: any) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
    const newPort = port + 1;
    console.log(`Attempting to use port ${newPort} instead...`);
    const retryServer = app.listen(newPort, '0.0.0.0', () => {
      console.log(`Backend running on port ${newPort} (original port was in use)`);
    });
    retryServer.on('error', (retryError: any) => {
      console.error('Failed to start server:', retryError.message);
      process.exit(1);
    });
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
