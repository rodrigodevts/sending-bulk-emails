import { QueueOptions } from "bull";

const accessKeyId = process.env['AWS_ACCESS_KEY_ID'] as string;
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'] as string;

interface MailConfig {
	driver: 'ses';

	queue: QueueOptions;

	config: {
		ses: {
			credentials: {
				accessKeyId: string;
				secretAccessKey: string;
			}
		}
	}
}

export default {
	driver: process.env.MAIL_DRIVER || 'ses',
	queue: {
		defaultJobOptions: {
			removeOnComplete: true,
			attempts: 5,
			backoff: {
				type: 'exponential',
				delay: 5000,
			},
		},
		limiter: {
			max: 150,
			duration: 6000,
		},
	},
	config: {
		ses: {
			credentials: {
				accessKeyId,
				secretAccessKey
			}
		}
	}
} as MailConfig;