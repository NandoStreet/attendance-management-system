import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    roomNo: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      default: new Date().getUTCDate() + "/" + new Date().getUTCMonth() + "/" + new Date().getUTCFullYear(),
    },
    data: {
      type: Map,
      required: true,
      default: {},
    },
    details: {
      type: Map,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
