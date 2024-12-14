import { MessageAttributes } from "../infra/mongoose/schemas/Message";

export type IMessageJob = {
	to: string;
	messageData: Omit<MessageAttributes, 'completedAt' | 'tags'>;
}