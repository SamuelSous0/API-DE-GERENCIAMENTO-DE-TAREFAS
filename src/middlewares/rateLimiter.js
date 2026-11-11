import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Muitas requisições originadas deste IP. Tente novamente mais tarde.',
  },
});

export default rateLimiter;
export { rateLimiter };

