import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    submissionId: {
      type: String,
      unique: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      
      trim: true,
    },

    institution: {
      type: String,
      
      trim: true,
    },

    department: {
      type: String,
      
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: {
      type: String,
      required: true,
    },

    paperFile: {
      originalName: {
        type: String,
        required: true,
      },

      storedName: {
        type: String,
        required: true,
      },

      path: {
        type: String,
        required: true,
      },

      mimetype: String,
      size: Number,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Revision Required",
        "Accepted",
        "Rejected",
      ],
      default: "Pending",
    },

    // PUBLICATION INFORMATION
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;