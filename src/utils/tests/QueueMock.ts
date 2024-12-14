import Queue from 'bull';
import IORedis from 'ioredis-mock';

const mockRedisClient = new IORedis();

const mockedQueue = new Queue('mocked-queue', {
	createClient() {
		return mockRedisClient;
	},
});

jest.genMockFromModule('bull');
jest.mock('bull');

const MockedQueue = Queue as jest.Mock<Queue.Queue>;

MockedQueue.mockImplementation(() => mockedQueue);

export default mockedQueue;