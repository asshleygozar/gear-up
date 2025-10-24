import express from 'express';
import cookieParse from 'cookie-parser';
import user from '#routes/auth.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3001',
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(user);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
