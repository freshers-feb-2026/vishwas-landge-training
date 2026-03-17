import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    maxlength: 500
  },

  address: {
    type: String,
    maxlength: 200
  }
}, {_id:false})


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

    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],

    age: {
      type: Number
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile:ProfileSchema
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

const User = mongoose.model("User", userSchema);

export default User;