import IQueueProvider from "@shared/adapters/models/QueueProvider";
import Bull, { ProcessPromiseFunction, Queue, QueueOptions } from "bull";

class BullProvider implements IQueueProvider {
	private queue: Queue;

	constructor(queueConfig: QueueOptions) {
		this.queue = new Bull('mail-queue', queueConfig);
	}

	async add(data: object | object[]): Promise<void> {
		if (Array.isArray(data)) {
			const parsedJobs = data.map(jobData => {
				return { data: jobData };
			});

			await this.queue.addBulk(parsedJobs);

			return;
		}

		await this.queue.add(data);
	}

	process(processFunction: ProcessPromiseFunction<object>): void {
		this.queue.process(150, processFunction);
	}
}

export { BullProvider };
