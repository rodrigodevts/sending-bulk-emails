import Contact from '@modules/contacts/infra/mongoose/schemas/Contact';
import Tag from '@modules/contacts/infra/mongoose/schemas/Tag';
import Message, { MessageModel } from '@modules/messages/infra/mongoose/schemas/Message';
import QueueProvider from '@shared/adapters/models/QueueProvider';
import { Types } from 'mongoose';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateMessageService {
	constructor(
		@inject('QueueProvider')
		private queueProvider: QueueProvider
	) {}

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
				return this.queueProvider.add({
					to: recipient.email,
					messageData,
				});
			}),
		);

		return message;
	} 
}

export { CreateMessageService };
