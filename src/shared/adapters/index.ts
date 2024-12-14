import mailConfig from '@configs/mail';
import queueConfig from '@configs/queue';
import redisConfig from '@configs/redis';
import { container } from 'tsyringe';
import QueueProvider from './models/QueueProvider';
import providers from "./providers";

const Queue = providers.queue[queueConfig.driver];

container.registerInstance<QueueProvider>(
	'QueueProvider',
	new Queue({
		...mailConfig.queue,
		redis: redisConfig
	}),
);