import Contact from "@modules/contacts/infra/mongoose/schemas/Contact";
import Tag from "@modules/contacts/infra/mongoose/schemas/Tag";
import { parse } from "csv-parse";
import { Readable } from "stream";

class ImportContactsService {
	async run(contactsFileStream: Readable, tags: string[]) {
		const parsers = parse({
			delimiter: ";"
		});

		const parseCsv = contactsFileStream.pipe(parsers);

		// Tags existentes no banco
		const existentTags = await Tag.find({
			title: {
				$in: tags,
			}
		});

		const existentTagsTitles = existentTags.map(tag => tag.title);

		//  Identifica as tags que ainda não existem
		const newTagsData = tags.filter(tag => !existentTagsTitles.includes(tag))
			.map(tag => ({ title: tag }));

		// Cria as novas tags no banco
		const createdTags = await Tag.create(newTagsData)

		const tagsIds = [
			...createdTags.map(tag => tag._id),
			...existentTags.map(tag => tag._id),
		];

		const emails: string[] = [];
		
		parseCsv.on('data', async line => {
			const [email] = line;

			emails.push(email);
		});

		await new Promise(resolve => parseCsv.on('end', resolve));

		for (const email of emails) {
			await Contact.findOneAndUpdate(
				{ email },
				{ $addToSet: { tags: tagsIds } },
				{ new: true, upsert: true },
			);
		}
	}
}

export { ImportContactsService };
