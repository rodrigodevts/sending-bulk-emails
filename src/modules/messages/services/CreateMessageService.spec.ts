import Contact from '@modules/contacts/infra/mongoose/schemas/Contact';
import Tag from '@modules/contacts/infra/mongoose/schemas/Tag';
import Message, { MessageAttributes } from "@modules/messages/infra/mongoose/schemas/Message";
import MongoMock from "@shared/tests/MongoMock";
import { Types } from "mongoose";
import { container } from 'tsyringe';
import { CreateMessageService } from "./CreateMessageService";

describe('Create Message', () => {
	beforeAll(async () => {
		await MongoMock.connect();
	});

	afterAll(async () => {
		// Fecha a conexão após os testes
		await MongoMock.disconnect();
	});

	beforeEach(async () => {
		await Message.deleteMany({});
		await Contact.deleteMany({});
		await Tag.deleteMany({});
	});

	it('Should be able to create new message', async () => {
		const add = jest.fn();

		container.register('QueueProvider', {
			useValue: {
				add,
			}
		});

		const createMessage = container.resolve(CreateMessageService);

		const tags = await Tag.create([
			{ title: 'iptu' },
			{ title: 'alerta' }
		]);

		const messageData: Omit<MessageAttributes, 'completedAt' | 'tags'> = {
			subject: 'Olá mundo!',
			body: '<p>Just testing the e-mail</p>'
		};

		await createMessage.run(messageData, tags.map(tag => tag.title));

		const message = await Message.findOne(messageData);

		expect(message).toBeTruthy();
	});

	it('Should create a redis register for each recipients email', async () => {
		const add = jest.fn();

		container.register('QueueProvider', {
			useValue: {
				add,
			}
		});

		const createMessage = container.resolve(CreateMessageService);

		const tags = await Tag.create([
			{ title: 'iptu' },
			{ title: 'alerta' }
		]);

		const tagsIds = tags.map(tag => tag._id as Types.ObjectId);

		const contacts = [
			{ email: 'digoshames@gmail.com', tags: tagsIds },
			{ email: 'contato@digigov.com.br', tags: tagsIds },
		];

		await Contact.create(contacts);

		const messageData: Omit<MessageAttributes, 'completedAt' | 'tags'> = {
			subject: 'Olá Redis!',
			body: '<p>Just testing the e-mail</p>'
		};

		await createMessage.run(messageData, ['iptu', 'alerta']);

		expect(add).toHaveBeenCalledWith({
			to: contacts[0].email,
			messageData,
		});
		expect(add).toHaveBeenCalledWith({
			to: contacts[1].email,
			messageData,
		});
	});
})