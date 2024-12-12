import Contact from "@schemas/Contact";
import Tag from "@schemas/Tag";
import mongoose from "mongoose";
import { Readable } from "stream";
import { ImportContactsService } from "./ImportContactsService";

describe('MongoDB Connection', () => {
	beforeAll(async () => {
		const mongo_uri = global as typeof globalThis & {
			__MONGO_URI__: string;
		};

		if (!mongo_uri.__MONGO_URI__) {
			throw new Error('MongoDB server not initialized');
		}

		await mongoose.connect(mongo_uri.__MONGO_URI__, {
			autoIndex: true,
		});
	});

	afterAll(async () => {
		// Fecha a conexão após os testes
		await mongoose.disconnect();
	});

	beforeEach(async () => {
		await Contact.deleteMany({});
		await Tag.deleteMany({});
	});

	it('Should be able to import new contacts', async () => {
		const contactsFileStream = Readable.from([
			'digoshames@gmail.com\n',
			'contato@digigov.com.br\n',
		]);

		const importContacts = new ImportContactsService();

		await importContacts.run(contactsFileStream, ['iptu', 'alerta']);

		const createdTags = await Tag.find({}).lean();

		expect(createdTags).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					title: 'iptu',
				}),
				expect.objectContaining({
					title: 'alerta',
				}),
			])
		);

		const createdTagsIds = createdTags.map(tag => tag._id);

		const createdContacts = await Contact.find({}).lean();

		expect(createdContacts).toEqual([
			expect.objectContaining({
				email: 'digoshames@gmail.com',
				tags: createdTagsIds,
			}),
			expect.objectContaining({
				email: 'contato@digigov.com.br',
				tags: createdTagsIds,
			}),
		]);
	});

	it('should not recreate tags that already exists', async () => {
		const contactsFileStream = Readable.from([
			'digoshames@gmail.com\n',
			'contato@digigov.com.br\n',
		]);

		const importContacts = new ImportContactsService();
		
		await Tag.create({ title: 'iptu' });

		await importContacts.run(contactsFileStream, ['iptu', 'alerta']);

		const createdTags = await Tag.find({}).lean();

		expect(createdTags).toEqual([
			expect.objectContaining({
				title: 'iptu',
			}),
			expect.objectContaining({
				title: 'alerta',
			}),
		]);
	});

	it('should not recreate contacts that already exists', async () => {
		const contactsFileStream = Readable.from([
			'digoshames@gmail.com\n',
			'contato@digigov.com.br\n',
		]);

		const importContacts = new ImportContactsService();

		const tag = await Tag.create({ title: 'iptu' });

		await Contact.create({
			email: 'digoshames@gmail.com',
			tags: [tag._id]
		});

		await importContacts.run(contactsFileStream, ['iptu', 'alerta']);

		const contacts = await Contact.find({
			email: 'digoshames@gmail.com'
		}).populate('tags').lean();

		const contactsTags = contacts[0].tags.map(item => ({
			title: item.title
		}));

		expect(contacts.length).toBe(1);
		expect(contactsTags).toEqual([
			expect.objectContaining({ title: 'iptu' }),
			expect.objectContaining({ title: 'alerta' }),
		])
	})
});