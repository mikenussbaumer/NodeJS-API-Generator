"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.filters = {};
    this.log(yosay(`Welcome to the ${chalk.red("NodeJS API")} generator!`));

    const prompts = [
      {
        type: "input",
        name: "appName",
        message: "What should your API be called?",
        default: "API"
      },
      {
        type: "checkbox",
        name: "odms",
        message: "What would you like to use for data modeling?",
        choices: [
          {
            value: "mongoose",
            name: "Mongoose (MongoDB)",
            checked: true
          },
          {
            value: "sequelize",
            name: "Sequelize (MySQL, SQLite, MariaDB, PostgreSQL)",
            checked: false
          }
        ]
      },
      {
        type: "list",
        name: "models",
        message: "What would you like to use for the default models?",
        choices: ["Mongoose", "Sequelize"],
        filter: val => val.toLowerCase(),
        when: answers => answers.odms && answers.odms.length > 1
      },
      {
        type: "confirm",
        name: "auth",
        message: "Would you scaffold out an authentication boilerplate?",
        when: answers => answers.odms && answers.odms.length !== 0
      },
      {
        type: "checkbox",
        name: "oauth",
        message: "Would you like to include additional oAuth strategies?",
        when: answers => answers.auth,
        choices: [
          {
            value: "googleAuth",
            name: "Google",
            checked: false
          },
          {
            value: "facebookAuth",
            name: "Facebook",
            checked: false
          },
          {
            value: "twitterAuth",
            name: "Twitter",
            checked: false
          }
        ]
      },
      {
        type: "confirm",
        name: "ws",
        message: "Would you like to use WebSockets?",
        // To-do: should not be dependent on ODMs
        when: answers => answers.odms && answers.odms.length !== 0,
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      if (props.ws) this.filters.ws = true;

      if (props.auth) this.filters.auth = true;

      if (props.odms && props.odms.length > 0) {
        var models;
        // eslint-disable-next-line no-negated-condition
        if (!props.models) {
          models = props.odms[0];
        } else {
          models = props.models;
        }
        this.filters.models = true;
        this.filters[models + "Models"] = true;
        props.odms.forEach(odm => {
          this.filters[odm] = true;
        });
      } else {
        this.filters.noModels = true;
      }

      if (props.oauth) {
        if (props.oauth.length) this.filters.oauth = true;
        props.oauth.forEach(oauthStrategy => {
          this.filters[oauthStrategy] = true;
        });
      }
      this.filters.appName = this.props.appName;
    });
  }

  writing() {
    this.filters = { filters: this.filters };

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(`${this.props.appName}`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath(`${this.props.appName}/package.json`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath("_build.sh"),
      this.destinationPath(`${this.props.appName}/build.sh`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath("_docker-compose.yml"),
      this.destinationPath(`${this.props.appName}/docker-compose.yml`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(`${this.props.appName}/.barbelrc`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(`${this.props.appName}/.gitignore`),
      this.filters
    );

    this.fs.copyTpl(
      this.templatePath(".dockerignore"),
      this.destinationPath(`${this.props.appName}/.dockerignore`),
      this.filters
    );

    if (!this.props.mongoose) {
      this.fs.delete(
        this.destinationPath("api/user/user.model(mongooseModels).js")
      );

      this.fs.delete(
        this.destinationPath("api/user/user.model(sequelizeModels).js")
      );

      this.fs.copyTpl(
        this.templatePath("api/user/user.model(mongooseModels).js"),
        this.destinationPath(`${this.props.appName}/api/user/user.model.js`),
        this.filters
      );
    } else if (!this.props.sequelize) {
      this.fs.delete(
        this.destinationPath("api/user/user.model(mongooseModels).js")
      );

      this.fs.delete(
        this.destinationPath("api/user/user.model(sequelizeModels).js")
      );

      this.fs.copyTpl(
        this.templatePath("api/user/user.model(sequelizeModels).js"),
        this.destinationPath(`${this.props.appName}/api/user/user.model.js`),
        this.filters
      );
    }
  }

  install() {
    this.installDependencies();
  }
};
