import redis from '@config/redis';
import Queue from 'bull';

const MailQueue = new Queue('email', {
	redis
});

export default MailQueue;