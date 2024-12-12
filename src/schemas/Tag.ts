import mongoose, { Document, Schema } from 'mongoose';

export type ITag = {
	title: string;
} & Document;

const TagSchema = new Schema<ITag>(
	{
		title: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<ITag>('Tag', TagSchema);