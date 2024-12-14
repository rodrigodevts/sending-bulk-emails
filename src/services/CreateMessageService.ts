import Contact from '@schemas/Contact';
import Message, { MessageModel } from '@schemas/Message';
import Tag from '@schemas/Tag';
import { Types } from 'mongoose';
import MailQueue from 'queues/MailQueue';

class CreateMessageService {
	constructor() {}

	async run(messageData: { subject: string; body: string }, tags: string[]): Promise<MessageModel> {
		const tagsExists = await Tag.find({
			title: {
				$in: tags,
			}
		});

		if (!tagsExists) {
			throw Error('Tags does not exists!');
		}

		const tagsIds = tagsExists.map(tag => tag._id as Types.ObjectId);

		const message = await Message.create({
			subject: messageData.subject,
			body: messageData.body,
			tags: tagsIds,
		});

		const recipients = await Contact.find({
			tags: {
				$in: tagsIds,
			}
		});

		await Promise.all(
			recipients.map(recipient => {
				return MailQueue.add({
					to: recipient.email,
					messageData,
				});
			}),
		);

		return message;
	} 
}

export { CreateMessageService };
