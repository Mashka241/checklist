// https://nodejs.org/api/sqlite.html

// This method is used to execute a single SQL statement without any parameters. 
// It is typically used for executing SQL commands that do not return any data
export const execute = async (db, sql, params = []) => {
    return new Promise((resolve, reject) => {
        const cb = (err) => {
            if (err) {
                console.log('ERROR', err);
                reject(err);
            };
            resolve();
        };
        if (params.length) {
            db.run(sql, params, cb)
        } else {
            db.exec(sql, cb);
        }
    });
};

export const getAll = async (db, sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

