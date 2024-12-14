import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import mail from '@config/mail';
import { MessageAttributes } from '@schemas/Message';

export type IMailParams = {
	to: string;
	messageData: Omit<MessageAttributes, 'completedAt' | 'tags'>;
}

class SendMessageToRecipientService {
	private client: SESClient;
	// private getSendQuota: GetSendQuotaCommand;

	constructor() {
		this.client = new SESClient({
			credentials: {
				accessKeyId: mail.accessKeyId,
				secretAccessKey: mail.secretAccessKey,
			},
			region: 'us-east-1',
		});
		// this.getSendQuota = new GetSendQuotaCommand({});
	}

	async run({ messageData, to }: IMailParams): Promise<void | Error> {
		try {
			const sendEmailParams = new SendEmailCommand({
				Destination: {
					ToAddresses: [
						`Rodrigo Alves <${to}>`, // Para quem
					],
				},
				Message: {
					Subject: {
						Charset: "UTF-8",
						Data: messageData.subject,
					},
					Body: {
						Text: {
							Charset: "UTF-8",
							Data: messageData.body,
						},
					},
				},
				Source: 'teste@digigov.com.br', // De quem
			});

			// const sendQuota = await this.client.send(this.getSendQuota);
			// console.log('sendQuota: ', {
			// 	max24HourSend: sendQuota.Max24HourSend,
			// 	maxSendRate: sendQuota.MaxSendRate,
			// 	sentLast24Hours: sendQuota.SentLast24Hours
			// });

			await this.client.send(sendEmailParams);
		} catch (err) {
			console.log('Error', err);
			if (err instanceof Error && err.name === "MessageRejected") {
				/** @type { import('@aws-sdk/client-ses').MessageRejected} */
				const messageRejectedError = err;
				throw messageRejectedError;
			}
			throw err;
		}	

		return;
	} 
}

export { SendMessageToRecipientService };
