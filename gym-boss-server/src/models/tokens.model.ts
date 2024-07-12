import { model, Schema, Document } from 'mongoose';
const TokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  refreshToken: {
    type: String,
    required: true,
  },

  expireAt:{
    type: Date,
    required: true
  },

  isActive:{
    type: Boolean,
    default: true
  }

}, 
{
    timestamps: true,
});

TokenSchema.index({ userId: 1, refreshToken: 'text' });
TokenSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0, background: true });

export const TokenModel = model<Document>('Token',TokenSchema);
