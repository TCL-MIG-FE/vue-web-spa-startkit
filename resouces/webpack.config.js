
if (process.env.NODE_ENV != 'production') {
    config = require("./webpack.dev.config.js");
} else {
    config = require("./webpack.prod.config.js");
}



module.exports = config;
