import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITable {
  x: number;
  y: number;
  seats: number;
  reserved: boolean;
}

export interface IScene {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IDateRange {
  startDate: Date;
  endDate: Date;
}

export interface IHallSchema extends Document {
  hallId: string;
  dateRange: IDateRange;
  tables: Types.DocumentArray<ITable & Document>;
  scenes: Types.DocumentArray<IScene & Document>;
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
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false } // no separate _id for dateRange
);

const HallSchemaSchema: Schema<IHallSchema> = new Schema(
  {
    hallId: { type: String, required: true },
    dateRange: { type: DateRangeSchema, required: true },
    tables: [TableSchema],
    scenes: [SceneSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IHallSchema>("HallSchema", HallSchemaSchema);
