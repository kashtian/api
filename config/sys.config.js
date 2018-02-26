export const port = process.env.PORT || 3010;

export const dbConfig = {
    host: process.env.dbHost || '192.168.10.239',
    port: process.env.dbPort || 3306,
    database: process.env.dbDatabase || 'fgc',
    username: process.env.dbUsername || 'mylive',
    password: process.env.dbPassword || 'devsgo'
}

export const redisConfig = {
    host: process.env.redisHost || 'localhost',
    port: process.env.redisPort || 11001,
    db: process.env.redisDB == null ? 1 : process.env.redisDB
}

export const wxConfig = {
    appID: process.env.appID || 'wx9c759c88cb47ffa9',
    appsecret: process.env.appsecret || 'bc1fd6c2af0eda0ef87bd6f05aa783c5'
}