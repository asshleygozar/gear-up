import { Router } from 'express';
import { signIn } from '../controller/user.js';

const user = Router();

user.post('/auth/signin', signIn);

export default user;
