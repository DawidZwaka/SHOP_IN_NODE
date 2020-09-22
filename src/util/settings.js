const fs = require("fs-extra");
const path = require("path");

class Settings {
  static settings = {};
  static settingsFilePath = path.join(__dirname, "../settings.json");

  static importSettings = () => {
    const path = this.settingsFilePath;
    try {
      const file = fs.readJSONSync(path);
      this.settings = file;
    } catch (err) {
      console.log(err);
    }
  };
  static parseOutput = (output) => {
    const parsedOutput = [];

    for (const key in output) {
      if (output[key].type !== "group") {
        parsedOutput.push({ ...output[key], name: key, fieldType: "single" });

        delete output[key];
      } else {
        const { label, inputs } = output[key];

        const parsedInputs = Object.entries(inputs).map(([itemKey, val]) => ({
          ...val,
          name: `${key}${itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}`,
        }));
        parsedOutput.push({ label, fieldType: "group", inputs: parsedInputs });
      }
    }

    return parsedOutput;
  };

  static updateSettings = () => {
    return fs.writeJSON(this.settingsFilePath, this.settings);
  };

  static getParsedSettings = () => {
    const output = JSON.parse(JSON.stringify(this.settings));

    return this.parseOutput(output);
  };

  static getSetting = (key) => this.settings[key];

  static getSettingVal = (key) => this.settings[key].value;
  static setSetting = (key, val) => {
    const setting = this.settings[key];

    if (setting !== undefined && setting.value !== val)
      this.settings[key].value = val;
  };
}

module.exports = Settings;
