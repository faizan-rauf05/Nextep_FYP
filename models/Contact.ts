import mongoose, { Schema, model, models } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;