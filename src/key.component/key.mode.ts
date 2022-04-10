import { model, Schema, Model, Document } from "mongoose";

const KeySchema: Schema = new Schema(
    {
        data: { type: [String] },
    },
    { timestamps: true }
);

export const Key: Model<IKey> = model("Key", KeySchema);
