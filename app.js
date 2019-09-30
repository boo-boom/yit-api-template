const inquirer = require("inquirer");
const config = require("./config");

class ApiTemplate {
  constructor() {
    this.init();
  }
  async init() {
    const argv = await this.getArgv();
    console.log(argv, config);
  }
  getArgv() {
    return inquirer.prompt([
      // {
      //   type: "input",
      //   name: "api",
      //   message: "请输入接口名:"
      // },
      {
        type: "list",
        name: "safe",
        message: "请选择安全等级",
        choices: ["Anonym", "User"]
      }
    ]);
  }
}

new ApiTemplate();
