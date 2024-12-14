import { IMailParams, SendMessageToRecipientService } from '@services/SendMessageToRecipientService';
import 'dotenv/config';
import 'reflect-metadata';

import MailQueue from "queues/MailQueue";

MailQueue.process(async job => {
	const { to, messageData } = job.data as IMailParams;
	
	const sendMessageToRecipient = new SendMessageToRecipientService();

	await sendMessageToRecipient.run({ to, messageData });
});

console.log('⚗ Processing mail sending queue!');