import mongoose, { Document, Schema } from 'mongoose';

export type ITag = {
	title: string;
} & Document;

export type TagModel = Document & ITag;

const TagSchema = new Schema<TagModel>(
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

export default mongoose.model<TagModel>('Tag', TagSchema);