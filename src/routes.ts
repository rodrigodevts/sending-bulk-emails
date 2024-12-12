import { SendMessageService } from '@services/SendMessageService';
import { Router } from 'express';

const routes = Router();

routes.get('/status', async (req, res) => {
	res.status(200).json({
		status: 'OK'
	});
});

routes.post('/messages', async (req, res) => {
	const sendMessage = new SendMessageService();

	await sendMessage.run();

	res.json({ ok: true });
})

export default routes;