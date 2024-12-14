import { CreateMessageService } from "@modules/messages/services/CreateMessageService";
import { Router } from "express";
import { container } from "tsyringe";

const messageRouter = Router();

messageRouter.post('/send', async (req, res) => {
	const { subject, body, tags } = req.body;
	const createMessage = container.resolve(CreateMessageService);

	const messageData = { subject, body };

	const message = await createMessage.run(messageData, tags);

	res.status(201).json(message);
});

export { messageRouter };
