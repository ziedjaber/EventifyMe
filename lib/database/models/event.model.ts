// EventModel.ts
import { Schema, model, Document, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  Date_creation?: Date;
  image_url: string;
  Start_date_time?: Date;
  end_date_time?: Date;
  price?: string;
  Free?: boolean;
  url: string;
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  Date_creation: { type: Date, default: () => new Date() }, // Use the Date constructor
  image_url: { type: String, required: true },
  Start_date_time: { type: Date, default: Date.now },
  end_date_time: { type: Date, default: Date.now },
  price: { type: String },
  Free: { type: Boolean, default: false },
  url: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Event = models.Event || model<IEvent>("Event", EventSchema);
export default Event;
