import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);

export default User;
