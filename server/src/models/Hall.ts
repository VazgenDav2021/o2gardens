import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITable {
  _id?: string;
  x: number;
  y: number;
  seats: number;
  reserved: boolean;
}

export interface IScene {
  _id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IDateRange {
  startDate: Date | number; // Timestamp
  endDate: Date | number; // Timestamp
}

export interface IHallSchema {
  dateRange: IDateRange;
  tables: ITable[];
  scenes: IScene[];
}

export interface IHall extends Document {
  name: {
    en?: string;
    ru?: string;
    hy?: string;
  };
  description: {
    en?: string;
    ru?: string;
    hy?: string;
  };
  capacity: number;
  image: string;
  schemas: Types.DocumentArray<IHallSchema & Document>;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema = new Schema<ITable & Document>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    seats: { type: Number, required: true },
    reserved: { type: Boolean, default: false },
  },
  { _id: true }
);

const SceneSchema = new Schema<IScene & Document>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: true }
);

const DateRangeSchema = new Schema<IDateRange>(
  {
    startDate: { type: Number, required: true }, // Store as timestamp
    endDate: { type: Number, required: true }, // Store as timestamp
  },
  { _id: false }
);

export const HallSchemaSchema = new Schema<IHallSchema & Document>(
  {
    dateRange: { type: DateRangeSchema, required: true },
    tables: [TableSchema],
    scenes: [SceneSchema],
  },
  { _id: true }
);

const HallSchema: Schema<IHall> = new Schema(
  {
    name: {
      en: String,
      ru: String,
      hy: String,
    },
    description: {
      en: String,
      ru: String,
      hy: String,
    },
    capacity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    schemas: [HallSchemaSchema],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

HallSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'hall',
});

export default mongoose.model<IHall>("Hall", HallSchema);

