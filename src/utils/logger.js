const chalk = require('chalk');

class Logger {
  info(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.blue('[INFO]')} ${message}`));
  }

  success(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.green('[SUCCESS]')} ${message}`));
  }

  warn(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.yellow('[WARN]')} ${message}`));
  }

  error(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.red('[ERROR]')} ${message}`));
  }

  debug(message) {
    console.log(chalk.gray(`[${this.time()}] - ${chalk.cyan('[DEBUG]')} ${message}`));
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