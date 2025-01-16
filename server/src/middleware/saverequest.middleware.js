const { db } = require('../db/db-knex-connection'); // Adjust to your Knex.js instance

const SaveRequestMiddleware = async (req, res, next) => {
    const originalSend = res.send;
    const requestData = JSON.stringify(req.body || req.query);
    const apiEndpoint = req.originalUrl.replace(/^\/api\/v1/, '');
    let isInserted = false; // Flag to prevent duplicate inserts

    try {
        // Define paths to ignore
        const ignorePaths = ['/', '/api_log_list','/track_log_list'];
  
        if (!ignorePaths.includes(apiEndpoint)) {
            // Wrap `res.send` to include tracking logic
            res.send = async function (body) {
                if (!isInserted) { // Check if the insert has already been performed
                    const responseData = JSON.stringify(body || {});
                    const statusCode = res.statusCode;

                    try {
                        // Insert request and response data into the database using Knex.js
                        await db('tracking_table').insert({
                            user_id: req.body.user_id > 0 ? req.body.user_id : 0,
                            request_data: requestData,
                            api_endpoint: apiEndpoint,
                            response_data: responseData,
                            status_code: statusCode,
                            timestamp: new Date() // Use MySQL `CURRENT_TIMESTAMP` if preferred
                        });

                        isInserted = true; // Set the flag to true after insertion
                    } catch (err) {
                        console.error('Error saving request/response data:', err);
                    }
                }

                // Send the response as usual
                originalSend.call(this, body);
            };
        }

        next();
    } catch (err) {
        console.error('Middleware Error:', err);
        next(err);
    }
};

module.exports = SaveRequestMiddleware;
