import { contactRouter } from "@modules/contacts/infra/http/routes/contact";
import { messageRouter } from "@modules/messages/infra/http/routes/messages";
import { Router } from "express";

const v1Router = Router();

v1Router.get('/status', async (req, res) => {
	res.status(200).json({
		status: 'OK'
	});
});

v1Router.use('/contacts', contactRouter);
v1Router.use('/messages', messageRouter);

export default v1Router;