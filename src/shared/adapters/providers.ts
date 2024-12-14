import { BullProvider } from "./implementations/queue/BullProvider";

const providers = {
	queue: {
		bull: BullProvider
	}
};

export default providers;