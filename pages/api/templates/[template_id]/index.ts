import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { paramToString } from '../../../../utils/param-utils';
import { deleteTemplate, getTemplateById } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const templateId = paramToString(req.query.template_id);
  if (!templateId) {
    return res.status(400).json({ message: 'Invalid data.' });
  }
  if (req.method === 'GET') {
    try {
      const template = await getTemplateById(templateId);
      return res.status(200).json({ template });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch cards.' });
    }
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    // Make sure the user is authenticated
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const { user } = await getTemplateById(templateId);
    if (user.id !== session.user.id) {
      return res
        .status(403)
        .json({ message: 'Can only delete your own template.' });
    }

    try {
      await deleteTemplate(templateId);
      return res
        .status(200)
        .json({ message: `Deleted template ${templateId}.` });
    } catch {
      return res.status(500).json({ message: 'Unable to delete template.' });
    }
  }
}

export default handler;
