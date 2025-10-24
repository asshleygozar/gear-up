import { Router } from 'express';
import { signIn } from '../controller/auth.js';

const user = Router();

user.post('/auth/signin', signIn);

export default user;
