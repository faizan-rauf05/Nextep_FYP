import mongoose, { Schema, models } from "mongoose"

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "counsellor"],
      required: true,
    },

    // student-only fields
    education: {
      type: String,
      default: null,
    },
    interests: {
      type: String,
      default: null,
    },

    // counsellor-only fields
    specialization: {
      type: String,
      default: null,
    },
    experience: {
      type: Number,
      default: null,
    },
    image: String,
    bio: {
      type: String,
      default: null,
    },
    availability: { type: [String], default: [] },
  },
  { timestamps: true }
)

export default models.User || mongoose.model("User", UserSchema)
