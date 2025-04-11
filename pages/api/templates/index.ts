import type { NextApiRequest, NextApiResponse } from 'next';
import {
  checkUserPermission,
  getTemplates,
  insertTemplate,
} from '../../../utils/db-utils';
import { paramToNumber } from '../../../utils/param-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const page = paramToNumber(req.query.page) ?? 1;

      const { templates, pageCount } = await getTemplates(page);

      return res.status(200).json({ templates, pageCount });
    } catch (e) {
      return res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
    }
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    // Make sure the user is authenticated
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const userId = session.user.id;
    const allowed = await checkUserPermission(userId, 'create_template');

    if (!allowed) {
      return res.status(403).json({ message: 'Insufficient permissions.' });
    }

    const { name, reqs } = req.body;

    if (typeof name !== 'string' || !Array.isArray(reqs)) {
      return res.status(422).json({ message: 'Invalid arguments.' });
    }

    try {
      const newTemplateId = await insertTemplate(name, userId, reqs);
      return res.status(200).json({ templateID: newTemplateId });
    } catch {
      return res.status(500).json({ message: 'Error.' });
    }
  }
}

export default handler;
