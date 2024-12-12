import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const accessKeyId = process.env['AWS_ACCESS_KEY_ID'] as string;
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'] as string;

class SendMessageService {
	private client: SESClient;
	private sendEmail: SendEmailCommand;

	constructor() {
		console.log('aa')
		this.client = new SESClient({
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
			region: 'us-east-1'
		});
		this.sendEmail = new SendEmailCommand({
			Destination: {
				ToAddresses: [
					'Rodrigo Alves <teste@digigov.com.br>',
				],
			},
			Message: {
				Subject: {
					Charset: "UTF-8",
					Data: "Olá Mundo",
				},
				Body: {
					Text: {
						Charset: "UTF-8",
						Data: "E-mail enviado com sucesso!",
					},
				},
			},
			Source: 'teste@digigov.com.br',
		});
	}

	async run(): Promise<void | Error> {
		try {
			console.log('Entrou aqui');
			const sendEmailParams = this.sendEmail;

			console.log(sendEmailParams);

			await this.client.send(sendEmailParams);
		} catch (err) {
			if (err instanceof Error && err.name === "MessageRejected") {
				/** @type { import('@aws-sdk/client-ses').MessageRejected} */
				const messageRejectedError = err;
				return messageRejectedError;
			}
			throw err;
		}	

		return;
	} 
}

export { SendMessageService };
