import mongoose, { Document, Schema } from 'mongoose';

// Sub-interfaces for nested objects
interface IEducation {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface IExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

interface ICertification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

// Main Resume Interface
export interface IResume extends Document {
  education: IEducation[];
  experience: IExperience[];
  skills: string[];
  certifications: ICertification[];
  summary: string;
  updatedAt: Date;
}

// Mongoose Schema
const ResumeSchema: Schema = new Schema(
  {
    education: [{
      degree: {
        type: String,
        required: true,
        trim: true
      },
      institution: {
        type: String,
        required: true,
        trim: true
      },
      year: {
        type: String,
        required: true
      },
      gpa: {
        type: String,
        trim: true
      }
    }],
    experience: [{
      title: {
        type: String,
        required: true,
        trim: true
      },
      company: {
        type: String,
        required: true,
        trim: true
      },
      duration: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: [String],
        required: true
      },
      technologies: {
        type: [String],
        default: []
      }
    }],
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one skill is required'
      }
    },
    certifications: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      issuer: {
        type: String,
        required: true,
        trim: true
      },
      year: {
        type: String,
        required: true
      },
      credentialUrl: {
        type: String,
        trim: true
      }
    }],
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IResume>('Resume', ResumeSchema);