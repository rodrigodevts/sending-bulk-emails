import Contact from "@schemas/Contact";
import Message, { MessageAttributes } from "@schemas/Message";
import Tag from "@schemas/Tag";
import QueueMock from '@utils/tests/QueueMock';
import { Types } from "mongoose";
import MongoMock from "utils/tests/MongoMock";
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
		const sendMessage = new CreateMessageService();

		const tags = await Tag.create([
			{ title: 'iptu' },
			{ title: 'alerta' }
		]);

		const messageData: Omit<MessageAttributes, 'completedAt' | 'tags'> = {
			subject: 'Olá mundo!',
			body: '<p>Just testing the e-mail</p>'
		};

		await sendMessage.run(messageData, ['iptu', 'alerta']);

		const message = await Message.findOne(messageData);

		expect(message).toBeTruthy();
	});

	it('Should create a redis register for each recipients email', async () => {
		const sendMessage = new CreateMessageService();

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

		await sendMessage.run(messageData, ['iptu', 'alerta']);

		expect(QueueMock.add).toHaveBeenCalledWith({
			to: contacts[0].email,
			messageData,
		});
		expect(QueueMock.add).toHaveBeenCalledWith({
			to: contacts[1].email,
			messageData,
		});
	});
})