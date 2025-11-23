import mongoose, { Document, Schema } from 'mongoose';

export interface ISlide extends Document {
  url: string;
  order: number;
  isLocalFile?: boolean; // Track if the image is uploaded locally
  createdAt: Date;
  updatedAt: Date;
}

const SlideSchema: Schema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isLocalFile: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISlide>('Slide', SlideSchema);

