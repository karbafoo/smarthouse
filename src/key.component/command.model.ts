import { model, Schema, Model, Document } from "mongoose";

const CommandSchema: Schema = new Schema(
    {
        data: { type: [String] },
    },
    { timestamps: true }
);

export const Command: Model<ICommand> = model("Command", CommandSchema);
