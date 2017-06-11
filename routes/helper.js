export default {
    comSuccess(res, data, message) {
        res.json({
            code: 200,
            data: data,
            msg: message
        });
    },

    comError(res, err) {
        res.json({
            code: 100,
            msg: err.message || ''
        });
    }
}