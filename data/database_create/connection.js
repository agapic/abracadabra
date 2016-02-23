var connectionString = process.env.DATABASE_URL ||
    'postgres://postgres:$31=$1@127.0.0.1:5432/abracadabra';
exports.connection = connectionString;

