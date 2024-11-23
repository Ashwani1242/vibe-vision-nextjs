import { NextApiRequest, NextApiResponse } from 'next';

// Mock database of promo codes
const promoCodes = {
    SAVE20: 0.2, // 20% discount
    SAVE50: 0.5, // 50% discount
    WELCOME10: 0.1, // 10% discount
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ valid: false, message: 'Promo code is required' });
        }

        const discount = promoCodes[code.toUpperCase()];
        if (discount) {
            return res.status(200).json({ valid: true, discount });
        } else {
            return res.status(200).json({ valid: false, message: 'Invalid promo code' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
