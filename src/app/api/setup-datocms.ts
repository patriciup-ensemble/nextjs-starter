import { buildClient } from '@datocms/cma-client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { datocmsApiToken, frontendUrl } = req.body;

    if (!datocmsApiToken || !frontendUrl) {
        return res.status(400).json({ success: false, message: 'Missing datocmsApiToken or frontendUrl' });
    }

    const client = buildClient({ apiToken: datocmsApiToken });

    try {
        const webPreviewsPlugin = await client.plugins.create({
            package_name: 'datocms-plugin-web-previews',
        });

        await client.plugins.update(webPreviewsPlugin, {
            parameters: {
                frontends: [
                    {
                        name: 'Preview',
                        previewWebhook: `${frontendUrl}/api/preview-links?token=${process.env.SECRET_API_TOKEN}`,
                    },
                ],
                startOpen: true,
            },
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
    }
}
