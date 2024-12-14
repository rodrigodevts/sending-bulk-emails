import mongoose from "mongoose";

import mongoConfig from '@configs/mongo';

const mongoUserPass = mongoConfig.username ? `${mongoConfig.username}:${mongoConfig.password}@` : '';

mongoose.connect(
	`mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
	{
		autoIndex: true,
	}
);