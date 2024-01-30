import { Schema, model, Document, Model } from 'mongoose';

interface User extends Document {
  clerkId: string;
  email: string;
  userName?: string;
  firstName: string;
  lastName: string;
  photo: string;
  events: Array<string>;
  orders: Array<string>;
}

let UserModel: Model<User>;

const UserSchema = new Schema<User>({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

try {
  // Try to get the existing model
  UserModel = model<User>('User') as Model<User>;
} catch (error) {
  // Model doesn't exist, create a new one
  UserModel = model<User>('User', UserSchema);
}

export default UserModel;
