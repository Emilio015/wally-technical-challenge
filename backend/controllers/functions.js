// MODELS
const Error = require('../models').error;
// END OF MODELS


exports.saveError = async(model, action, error_data, error_msg) => {
    await Error.create({
        model,
        action,
        error_data: JSON.stringify(error_data),
        error_msg: JSON.stringify(error_msg)
    });
};