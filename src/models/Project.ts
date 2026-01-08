import mongoose, { Document, Schema } from 'mongoose';

// TypeScript Interface - defines the shape of data
export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema - defines database structure and validation
const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'Technologies array cannot be empty'
      }
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/(www\.)?github\.com\/.+/,
        'Please provide a valid GitHub URL'
      ]
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Please provide a valid URL'
      ]
    },
    imageUrl: {
      type: String,
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Export the model
export default mongoose.model<IProject>('Project', ProjectSchema);