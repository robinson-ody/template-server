import { Document, Model, Schema, model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserRole } from '../constants/user-role';

interface UserAttrs {
  username: string;
  password: string;
  role: UserRole;
}

interface UserDoc extends Document {
  username: string;
  password: string;
  role: UserRole;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const user_schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
  },

  {
    timestamps: true,

    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

user_schema.set('versionKey', 'version');
user_schema.plugin(updateIfCurrentPlugin);
user_schema.statics.build = (attrs: UserAttrs) => new User({ ...attrs });
const User = model<UserDoc, UserModel>('User', user_schema);

export { User, UserDoc };
