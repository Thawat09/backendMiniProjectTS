const redisClient: any = require('../../configs/redis').default;

const methods = {
    get: (key: string): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err: any, reply: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    },
    set: (key: string, value: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            redisClient.set(key, value, (err: any, reply: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    },
    incr: (key: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            redisClient.incr(key, (err: any, reply: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    },
    decr: (key: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            redisClient.decr(key, (err: any, reply: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    },
    delete: (key: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            redisClient.del(key, (err: any, reply: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }
};

export default methods;