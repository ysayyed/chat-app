import { Schema, Document } from 'mongoose';

export const chatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    text: {
      type: String,
      required: true,
      index: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export interface IChat extends Document {
  sender: string;
  text: string;
  receiver: string;
}
