import mongoose, { Document, Schema } from 'mongoose';

export interface IContactInfo {
  name: string;
  phone: string;
  email: string;
}

export interface IReservation extends Document {
  eventId?: string;
  tableId: string;
  hall: string;
  bookingType: 'regular' | 'event';
  contactInfo: IContactInfo;
  menuItems: string[];
  deposit: number;
  totalAmount: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const ContactInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const ReservationSchema: Schema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    tableId: {
      type: String,
      required: true,
    },
    hall: {
      type: Schema.Types.ObjectId,
      ref: 'Hall',
      required: true,
    },
    bookingType: {
      type: String,
      enum: ['regular', 'event'],
      required: true,
    },
    contactInfo: {
      type: ContactInfoSchema,
      required: true,
    },
    menuItems: [{
      type: String,
    }],
    deposit: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);

