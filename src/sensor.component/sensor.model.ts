import { model, Schema, Model, Document } from "mongoose";

const SensorSchema: Schema = new Schema(
    {
        data: { type: [String] },
    },
    { timestamps: true }
);

export const Sensor: Model<ISensor> = model("Sensor", SensorSchema);
