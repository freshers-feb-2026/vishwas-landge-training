import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,

      set(value) {
        return value.trim().toUpperCase();
      },

      get(value) {
        return value ? value.toUpperCase() : value;
      }
    },

    age: {
      type: Number
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

const User = mongoose.model("User", userSchema);

export default User;