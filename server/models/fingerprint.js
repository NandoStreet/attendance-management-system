import mongoose from "mongoose";

const fingerprintSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: (new Date().getUTCDate()-1) + "/" + (new Date().getUTCMonth()+1) + "/" + new Date().getUTCFullYear(),
    },
    time: {
      type: String,
      default: new Date().toLocaleTimeString(),
    },
  },
  {
    timestamps: true,
  }
);

const Fingerprint = mongoose.model("Fingerprint", fingerprintSchema);

export default Fingerprint;
