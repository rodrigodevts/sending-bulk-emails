import mongoose from "mongoose";

import mongoConfig from '@config/mongo';

const mongoUserPass = mongoConfig.username ? `${mongoConfig.username}:${mongoConfig.password}@` : '';

mongoose.connect(
	`mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
	{
		autoIndex: true,
	}
);