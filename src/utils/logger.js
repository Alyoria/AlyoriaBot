const chalk = require('chalk');

class Logger {
  info(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.blue('[INFO]')} ${chalk.white(message)}`));
  }

  success(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.green('[SUCCESS]')} ${chalk.white(message)}`));
  }

  warn(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.yellow('[WARN]')} ${chalk.white(message)}`));
  }

  error(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.red('[ERROR]')} ${chalk.white(message)}`));
  }

  debug(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.cyan('[DEBUG]')} ${chalk.white(message)}`));
  }

  time() {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }

  clear() {
    console.clear();
  }
}
module.exports = new Logger();