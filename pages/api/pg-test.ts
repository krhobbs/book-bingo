import type { NextApiRequest, NextApiResponse } from 'next';
import * as DB from '../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sqr: Square = {
        id: '24',
        req: 'Blah blah blah'
    };
    const user_id = '9dc88ee0-7782-44bb-8c7f-3e31c285677c';
    const card_id = '2ef01567-8a0e-44a5-9096-062ad60e0292';
    const template_id = '89f1f931-59a2-4e3b-8211-e453a9ac53f4';

    //const cards = await DB.insertCard(user_id, template_id);

    const card = await DB.getSquareOfCard(card_id, 0);


    res.status(200).json(card);
}

export default handler;
