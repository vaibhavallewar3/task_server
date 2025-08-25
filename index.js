import cors from 'cors';
import express from 'express';

import ErrorMiddleware from './middleware/error.js';
import task_router from './routes/task.js';
import user_router from './routes/user.js';



const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/', (req, resp) => {
    resp.status(200).send('<h1>APP STARTED!</h1>');
});

app.use('/api/v1/user', user_router);

app.use('/api/v1/task', task_router);


app.listen(7800, (error) => console.warn('Server Started : http://localhost:' + 7800));

app.use(ErrorMiddleware);

