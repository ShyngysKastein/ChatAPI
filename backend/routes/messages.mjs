import express from 'express';
import db from '../fileDb.mjs';
import { nanoid } from 'nanoid';

const router = express.Router();

router.get('/', (req, res) => {
    const messages = db.getItems().slice(1).slice(-30).reverse();
    res.send(messages);
    if (req.query.datetime) {
        const message = messages.sort((a, b) => {
            return new Date(a.datetime) - new Date(b.datetime);
        });
        res.send(message);
        if (!messages) {
            return res.status(400).send({ error: "get request was not successful" });
        }
    }
    if (!messages) {
    return res.status(400).send({ error: "get request was not successful" });
}
})

router.post('/', (req, res) => {
    if (req.body.message !== "" && req.body.author !== "") {
        const body = { id: nanoid(21), ...req.body, datetime: new Date().toISOString() };
        db.addItem(body);
        res.send(body);
    } else {
        res.status(400);
        const error = { error: "Author and message must be present in the request" };
        res.send(error);
    }
})

export default router;