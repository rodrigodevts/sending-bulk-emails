import mongoose, { Document, Schema, Types } from 'mongoose';

export type MessageAttributes = {
	subject: string;
	body: string;
	completedAt: Date;
	tags: Types.ObjectId[];
}

export type MessageModel = Document & MessageAttributes;

const MessageSchema = new Schema(
	{
		subject: {
			type: String,
			trim: true,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		completedAt: {
			type: Date,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<MessageModel>('Message', MessageSchema);