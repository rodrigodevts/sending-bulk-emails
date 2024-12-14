import mongoose, { Mongoose } from "mongoose";

class MongoMock {
	private database: Mongoose;

	constructor() {
		this.database = mongoose;
	}

	async connect(): Promise<void> {
		const mongo_uri = global as typeof globalThis & {
			__MONGO_URI__: string;
		};

		if (!mongo_uri.__MONGO_URI__) {
			throw new Error('MongoDB server not initialized');
		}

		await this.database.connect(mongo_uri.__MONGO_URI__, {
			autoIndex: true,
		});
	}

	disconnect(): Promise<void> {
		return this.database.connection.close();
	}
}

export default new MongoMock();