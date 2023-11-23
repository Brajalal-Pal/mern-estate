import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    phone: String,
    isAdmin: { type: Boolean, default: false },
    street: String,
    apartment: String,
    zip: String,
    city: String,
    country: String,
    status: { type: String, default: "active", enum: ["active", "inactive", "deleted"], required: true },
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
