var connectionString = process.env.DATABASE_URL ||
    'postgres://postgres:$31=$1@159.203.43.207:5432/abracadabra';
exports.connection = connectionString;
