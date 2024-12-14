import { ImportContactsService } from "@modules/contacts/services/ImportContactsService";
import { Router } from "express";
import fs from 'fs';
import path from 'path';

const contactRouter = Router();

contactRouter.post('/import', async (req, res) => {
	const { tags } = req.body;

	const contactsReadStream = fs.createReadStream(
		path.resolve(__dirname, '..', 'tmp', 'contacts.csv'),
	);

	const importContacts = new ImportContactsService();

	await importContacts.run(contactsReadStream, tags);

	res.send();
});

export { contactRouter };
