import mongoose, { Schema, models } from "mongoose";

// Education sub-schema
const EducationSchema = new Schema(
  {
    degree: { type: String, required: true },
    major: { type: String, required: true },
    university: { type: String, required: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
  },
  { _id: false },
); // no separate _id for education

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
      type: EducationSchema,
      default: null, // optional for flexibility
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
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },
    image: String,
    bio: {
      type: String,
      default: null,
    },
    availability: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default models.User || mongoose.model("User", UserSchema);
