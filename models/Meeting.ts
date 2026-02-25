import mongoose, { Schema, models } from "mongoose"

const MeetingSchema = new Schema(
  {
    // Student reference
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Counsellor reference
    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sessionType: {
      type: String,
      required: true,
    },

    sessionDuration: {
      type: String,
      required: true,
    },

    sessionPrice: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    platformFee: {
      type: Number,
      default: 50,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    meetingLink: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export default models.Meeting || mongoose.model("Meeting", MeetingSchema)