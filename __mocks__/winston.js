const winston = jest.genMockFromModule('winston')

const transports = {
  Stream: function () {},
  Console: function () {}
}
const format = {
  printf: () =>{},
  splat: () =>{},
  timestamp: () =>{},
  simple: () =>{},
  combine: () =>{},
  colorize: () =>{},
  json: () =>{}
}


winston.transports = transports;
winston.format = format;

module.exports = winston;