import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (id, username) => {
    return jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '12h' });
}