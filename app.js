const fs = require("fs");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const { controllerPath } = require("./config");

const createdApi = answers => {
  const { api } = answers;
  const template = fs.readFileSync(__dirname + "/src/template/api.txt", "utf-8");
  const renderTemplate = render(template, answers);
  const group = delGroupPrefix(api.split(".")[0]);
  const file = api.split(".")[1];
  const groups = fs.readdirSync(controllerPath);
  if (!groups.includes(group)) {
    fs.mkdirSync(`${controllerPath}/${group}`);
  }
  fs.writeFileSync(`${controllerPath}/${group}/${file}.ts`, renderTemplate);
  ora({ spinner: "smiley" }).succeed(chalk.blue.bold("[创建成功]"));
};

const render = (template, answers) => {
  const reg = /{{2}\w+}{2}/gi;
  const variable = template.match(reg);
  variable.forEach(item => {
    const key = item.replace(/({|})/gi, "");
    template = template.replace(item, `${answers[key]}`);
  });
  return template;
};

const delGroupPrefix = group => {
  if (group && group.startsWith("node_")) {
    return group.replace("node_", "");
  }
  return group;
};

const firstToUpperCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

inquirer
  .prompt([
    {
      type: "input",
      name: "api",
      message: "请输入接口名:",
      validate(value) {
        const isNodePrefix = /^node_([a-zA-Z]+)\.([a-zA-Z]+)|(\d)$/gi.test(value);
        return new Promise(resolve => {
          if (!isNodePrefix) resolve(`${chalk.red.bold("[命名错误]")} ${chalk.yellow.bold("请参照格式: node_aaa.bbb")}`);
          const group = delGroupPrefix(value.split(".")[0]);
          const file = value.split(".")[1] + ".ts";
          const groups = fs.readdirSync(controllerPath);
          let files = [];
          if (groups.includes(group)) {
            files = fs.readdirSync(`${controllerPath}/${group}`);
          }
          if (files.includes(file)) {
            resolve(`${chalk.red.bold("[创建错误]")} ${chalk.yellow.bold("该接口已存在, 请替换接口名")}`);
          }
          resolve(true);
        });
      }
    },
    {
      type: "list",
      name: "safe",
      message: "请选择安全等级",
      choices: ["Anonym", "User"]
    }
  ])
  .then(answers => {
    const { api } = answers;
    const group = api.split(".")[0];
    const name = api.split(".")[1];
    answers.group = group;
    answers.name = name;
    answers.oriApi = `${delGroupPrefix(group)}.${delGroupPrefix(name)}`;
    answers.params = `Api_Node${delGroupPrefix(group).toUpperCase()}_${firstToUpperCase(name)}Params`;
    answers.success = `Api_Node${delGroupPrefix(group).toUpperCase()}_${firstToUpperCase(name)}Response`;
    answers.error = `Api_Node${delGroupPrefix(group).toUpperCase()}_${firstToUpperCase(name)}Error`;
    createdApi(answers);
  });
