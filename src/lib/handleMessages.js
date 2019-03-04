const logger = require('./logger/logger');

function handleMessages(messages, path, hinted) {
  const { messages: parsed } = messages ? JSON.parse(messages) : { messages: [] };
  const combined = [...parsed, ...hinted];
  if (combined.length === 0) {
    const level = 'success';
    const message = 'Document checking completed. No errors found.';
    const meta = { path };
    logger.log({ level, message, meta });
  }

  combined.forEach(msg => {
    if (msg.type === 'warn') {
      msg.type = 'info'; /* eslint-disable-line */
    }
    const place = `From line: ${msg.line || msg.lastLine} column: ${msg.col || msg.lastColumn}`;
    logger.log({ level: msg.type, message: msg.message, meta: { path, place } });
  });
}

module.exports = handleMessages;
