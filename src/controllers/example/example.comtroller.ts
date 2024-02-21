import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const indexController = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Hello, TypeScript Express!');
};

export default indexController;