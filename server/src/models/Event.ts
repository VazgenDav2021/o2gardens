import mongoose, { Schema, Types } from "mongoose";

export interface IMenuItem {
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
  price: number;
}

export interface IEvent {
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
  artists: {
    en?: string;
    ru?: string;
    hy?: string;
  };
  date: Date;
  deposit: number;
  image: string;
  isAdult: boolean;
  hall: Types.ObjectId | string;
  capacity: number;
  menu: IMenuItem[];
  schema: Types.ObjectId | string; // <-- исправлено
  timeStart: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema(
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
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

const EventSchema: Schema = new Schema(
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
    artists: {
      en: String,
      ru: String,
      hy: String,
    },
    date: {
      type: Date,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    isAdult: {
      type: Boolean,
      default: false,
    },
    hall: {
      type: Schema.Types.ObjectId,
      ref: 'Hall',
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    menu: [MenuItemSchema],
    schema: {
      type: Schema.Types.ObjectId,
      // Schema ID within a Hall's schemas array
    },
    timeStart: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>("Event", EventSchema);
