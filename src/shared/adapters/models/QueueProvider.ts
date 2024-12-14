import { ProcessPromiseFunction } from "bull";

export default interface IQueueProvider {
	add(data: object | object[]): Promise<void>;
	process(processFunction: ProcessPromiseFunction<object>): void;
}