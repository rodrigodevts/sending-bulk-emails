import MailMock from "@shared/tests/MailMock";
import { container } from "tsyringe";
import { SendMessageToRecipientService } from "./SendMessageToRecipientService";

describe('Send Message to Recipient', () => {
	it('Should send message to the recipient', async () => {
		const SendMessageToRecipient = container.resolve(SendMessageToRecipientService);

		SendMessageToRecipient.run({
			to: 'rodrigo.as@digigov.com.br', 
			messageData: {
				subject: 'Hello World',
				body: 'Just testing'
				}
		});

		expect(MailMock.SendEmailCommand).toHaveBeenCalled();
	});
});