import { Schema, Document } from 'mongoose';

export const contactSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    recepient: {
      type: String,
      required: true,
    },
    requestFrom: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export interface IContact extends Document {
  sender: string;
  receiver: string;
  isAccepted: boolean;
  isRejected: boolean;
}
