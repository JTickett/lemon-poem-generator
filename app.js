import express from 'express';
import chatCompletion from './services/openai.js';

const app = express();

app.get(
    '/',
    (req, res) => {
        res.send('Hello from my lovely new server!');
    }
);

app.get(
    '/test',
    async (req, res) => {
        const response = await chatCompletion("Provide an amusing sentence.");
        res.send(response);
    }
);

export default app;