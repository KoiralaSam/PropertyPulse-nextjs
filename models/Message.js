import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "message is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
