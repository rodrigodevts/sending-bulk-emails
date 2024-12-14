import { CreateMessageService } from '@services/CreateMessageService';
import { ImportContactsService } from '@services/ImportContactsService';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const routes = Router();

routes.get('/status', async (req, res) => {
	res.status(200).json({
		status: 'OK'
	});
});

routes.post('/contacts/import', async (req, res) => {
	const { tags } = req.body;

	const contactsReadStream = fs.createReadStream(
		path.resolve(__dirname, '..', 'tmp', 'contacts.csv'),
	);

	const importContacts = new ImportContactsService();

	await importContacts.run(contactsReadStream, tags);

	res.send();
});

routes.post('/messages', async (req, res) => {
	const { subject, body, tags } = req.body;
	const createMessage = new CreateMessageService();

	const messageData = { subject, body };

	const message = await createMessage.run(messageData, tags);

	res.status(201).json(message);
});

export default routes;