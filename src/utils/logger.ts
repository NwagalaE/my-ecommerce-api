import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
  transport: {
    target: 'pino-pretty', // Pretty-printing for development
    options: {
      colorize: true, // Enable colorization
    },
  },
  base: {
    pid: false, // Remove process ID from logs
  },
  timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`, // Use a more readable timestamp format
});

export default log;