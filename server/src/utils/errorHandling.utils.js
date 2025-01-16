// const logger = require('./logger');
const path = require('path');
const fs = require('fs');
/**
 * This class describes an user model.
 *
 * @class      UserModel (name)
 */
class ErrorHandling {

  /**
   * check_token checking user token
   *
   * @param      {<json>}  params  The parameters
   * @return     {<json>}  The user token data
   */
  error_handling_method = async (req,res,next) => {
    const { date, type } = req.params;
    const logTypes = ['combined', 'error'];
    const logsDirectory = path.join(__dirname, '../../logs');

    if (!logTypes.includes(type)) {
      fs.readdir(logsDirectory, (err, files) => {
        if (err) {
            console.error('Error reading logs directory:', err);
            return res.status(500).send('Internal Server Error');
        }

        const logFiles = files.filter(file => file.endsWith('.log'));
        res.json(logFiles);
    });
    }

    const file = path.join(__dirname, '../../logs', `${date}-${type}.log`);

    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing log file:', err);
            return res.status(404).send('Log file not found');
        }

        res.download(file, `${date}-${type}.log`, (err) => {
            if (err) {
                console.error('Error downloading log file:', err);
                res.status(500).send('Error downloading the file');
            }
        });
    });
  }
}

module.exports = new ErrorHandling();
