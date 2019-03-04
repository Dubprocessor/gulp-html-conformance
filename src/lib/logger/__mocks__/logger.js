const logger = jest.mock('../logger');

const add = () => {};
const log = () => {};
logger.add = add;
logger.log = log;

module.exports = logger;
