import mongoose from "mongoose";
import Contact from "../src/schemas/Contact";

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
		await Contact.deleteMany();
	});

	it('Should be able to import new contacts', async () => {
		// Arquivo CSV

		//Importar CSV

		// Repassar uma tag

		// Espero que tenha os contatos de dentro do CSV salvos no banco com a tag
	});
});