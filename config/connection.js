var connectionString = process.env.DATABASE_URL ||
    'postgres://postgres:$rgx!idxX@159.203.43.207:5432/abracadabra';
exports.connection = connectionString;
