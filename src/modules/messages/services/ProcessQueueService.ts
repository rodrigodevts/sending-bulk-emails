import IQueueProvider from "@shared/adapters/models/QueueProvider";
import { container, inject, injectable } from "tsyringe";
import { IMessageJob } from "../dtos/messageJob";
import { SendMessageToRecipientService } from "./SendMessageToRecipientService";

@injectable()
class ProcessQueueService {
	constructor(
		@inject('QueueProvider') 
		private queueProvider: IQueueProvider
	) {}

	execute(): void {
		this.queueProvider.process(async job => {
			const { to, messageData } = job.data as IMessageJob;

			const sendMessageToRecipient = container.resolve(SendMessageToRecipientService);

			await sendMessageToRecipient.run({ to, messageData });
		})
	}
}

export { ProcessQueueService };
