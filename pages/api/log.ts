import { NextApiRequest, NextApiResponse } from 'next';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { level, message } = req.body;
  logger.log({ level, message });

  res.status(200).json({ status: 'ok' });
}
