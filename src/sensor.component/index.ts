import { Sensor } from "./sensor.model";

export const onNewSensor = ({ data }: { data: any[] }): Promise<ISensor> => {
    return new Promise((resolve, reject) => {
        const newSensor = new Sensor({
            data: data,
        });
        newSensor.save((err: any, savedDoc: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(savedDoc.toObject());
            }
        });
    });
};

export const getLatestSensor = (): Promise<ISensor> => {
    return new Promise((resolve, reject) => {
        Sensor.find({})
            .sort({ createdAt: -1 })
            .limit(1)
            .lean()
            .then((docs) => {
                resolve(docs[0]);
            })
            .catch(reject);
    });
};
