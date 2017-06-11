export const port = process.env.PORT || 3005;

export const dbConfig = {
    host: process.env.dbHost || '192.168.10.239',
    port: process.env.dbPort || 3306,
    database: process.env.dbDatabase || 'fgc',
    username: process.env.dbUsername || 'mylive',
    password: process.env.dbPassword || 'devsgo'
}

export const redisConfig = {
    host: process.env.redisHost || '52.74.165.14',
    port: process.env.redisPort || 6379,
    db: process.env.redisDB == null ? 1 : process.env.redisDB
}