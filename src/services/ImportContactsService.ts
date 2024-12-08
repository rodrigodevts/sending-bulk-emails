import Contact from "@schemas/Contact";
import Tag from "@schemas/Tag";
import { parse } from "csv-parse";
import { Readable } from "stream";

class ImportContactsService {
	async run(contactsFileStream: Readable, tags: string[]) {
		const parsers = parse({
			delimiter: ";"
		});

		const parseCsv = contactsFileStream.pipe(parsers);

		const existentTags = await Tag.find({
			title: {
				$in: tags,
			}
		}).exec();

		const existentTagsTitles = existentTags.map(tag => tag.title);

		const newTagsData = tags.filter(tag => !existentTagsTitles.includes(tag))
			.map(tag => ({ title: tag }));

		const createdTags = await Tag.create(newTagsData)
		const tagsIds = createdTags.map(tag => tag._id);
		
		parseCsv.on('data', async line => {
			const [email] = line;

			await Contact.findOneAndUpdate(
				{ email },
				{ $addToSet: { tags: tagsIds } },
				{ new: true, upsert: true },
			);
		});

		await new Promise(resolve => parseCsv.on('end', resolve));
	}
}

export { ImportContactsService };
