import 'dotenv/config';
import 'reflect-metadata';

import { ProcessQueueService } from '@modules/messages/services/ProcessQueueService';
import { container } from 'tsyringe';

import '@shared/adapters';
import '@shared/infra/mongoose/connection';

const processQueue = container.resolve(ProcessQueueService);

processQueue.execute();

console.log('⚗‎‎  Processing mail sending queue!');