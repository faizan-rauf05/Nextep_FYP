import mongoose, { Schema, models } from "mongoose"

const AvailabilitySchema = new Schema(
  {
    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    timeSlots: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
)

export default models.Availability ||
  mongoose.model("Availability", AvailabilitySchema)