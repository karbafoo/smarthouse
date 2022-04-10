import { Key } from "./key.mode";
import { Command } from "./command.model";

export const checkKeys = ({
    data,
}: {
    data: any;
}): Promise<ICommand | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const latestCommandDoc = await getLatestCommand();
            const keyDoc = await onNewKeys({ data: data });
            if (!latestCommandDoc) {
                return resolve(null); //TODO ???
            }
            const latestCommand = latestCommandDoc.data;
            for (let i = 0; i < latestCommand.length; i++) {
                if (
                    latestCommand[i] != null &&
                    data[i] != null &&
                    latestCommand[i] == data[i]
                ) {
                    continue;
                } else {
                    console.log(
                        "else",
                        latestCommand[i] &&
                            data[i] &&
                            latestCommand[i] == data[i]
                    );
                    resolve(latestCommandDoc);
                }
            }
            resolve(null);
        } catch (err) {
            reject(err);
        }
    });
};

export const getLatestKey = (): Promise<IKey> => {
    return new Promise((resolve, reject) => {
        Key.find({})
            .sort({ createdAt: -1 })
            .limit(1)
            .lean()
            .then((docs) => {
                resolve(docs[0]);
            })
            .catch(reject);
    });
};

export const getLatestCommand = (): Promise<ICommand> => {
    return new Promise((resolve, reject) => {
        Command.find({})
            .sort({ createdAt: -1 })
            .limit(1)
            .lean()
            .then((docs) => {
                resolve(docs[0]);
            })
            .catch(reject);
    });
};

export const onNewCommand = ({ data }: { data: any[] }): Promise<ICommand> => {
    return new Promise((resolve, reject) => {
        const newCommand = new Command({
            data: data.map((i) => __GET_COMMAND_CODE__(i)),
        });
        newCommand.save((err: any, savedDoc: any) => {
            if (err) {
                reject(err);
            } else {
                console.log("savedDoc.toObject()", savedDoc.toObject());
                resolve(savedDoc.toObject());
            }
        });
    });
};
export const onNewKeys = ({ data }: { data: any[] }): Promise<IKey> => {
    return new Promise((resolve, reject) => {
        const newKey = new Key({
            data: data,
        });
        newKey.save((err: any, savedDoc: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(savedDoc.toObject());
            }
        });
    });
};

const __GET_COMMAND_CODE__ = (i: any) => {
    try {
        const j = parseInt(i);
        return j < 3 && j > -1 ? j : 0;
    } catch (err) {
        return -1;
    }
};
