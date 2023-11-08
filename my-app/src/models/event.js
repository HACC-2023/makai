import { ISLANDS } from "@/constants/constants";
import mongoose from "mongoose";

// subdocument schema
const publicContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

const eventSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [
      "Reported",
      "Removal and Storage",
      "Sorting",
      "Disposal",
      "Complete",
    ],
  },
  reportedDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  publicType: {
    type: String,
    required: true,
  },
  publicTypeDesc: {
    // if the public type is "other" or if the reported wants to add more details
    type: String,
    required: true,
    default: "No additional description provided"
  },
  publicContainerFullness: {
    type: String,
    required: true,
  },
  publicClaimBoat: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
    default: "No",
  },
  publicBiofoulingRating: {
    type: Number,
    required: true,
    max: 10
  },
  publicLocationDesc: {
    type: String,
    required: true,
    default: "No additional description provided"
  },
  publicLatLongOrPositionDesc: {
    // this is the free text field on DOBOR form where reporter can enter lat/long or position description
    type: String,
  },
  mapLat: {
    // the lat from the embedded map
    type: Number,
  },
  mapLong: {
    type: Number,
  },
  closestIsland: {
    type: String,
    enum: ISLANDS,
    required: true,
  },
  closestLandmark: {
    type: String,
  },
  debrisLandmarkRelativeLocation: {
    type: String,
  },
  publicDebrisEnvDesc: {
    // caught in reef, loose on shore, etc
    type: String,
    required: true,
  },
  publicDebrisEnvAdditionalDesc: {
    type: String,
  },
  publicContact: publicContactSchema,
  imageUrl: {
    type: String,
  },
  dibsByOrgId: {
    type: String,
    trim: true,
  },
  removedByOrgId: {
    type: String,
    trim: true,
  },
  removalStartDate: {
    type: Date,
  },
  removalEndDate: {
    type: Date,
  },
  debrisSize: {
    type: Number,
    trim: true,
  },
  debrisMass: {
    type: Number,
    trim: true,
  },
  tempStorage: {
    type: Number,
    trim: true,
  },
  assessedEnvDamage: {
    type: String,
    trim: true,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
