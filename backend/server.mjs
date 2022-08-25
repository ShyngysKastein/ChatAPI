import express from 'express';
import messages from './routes/messages.mjs';
import db from './fileDb.mjs';
import cors from 'cors';

const app = express();
const PORT = 8000;

db.init();

app.use(express.json());
app.use(cors());
app.use('/messages',messages);


app.listen(PORT,() => {
    console.log(`Server started at http://localhost:${PORT} port`);
})