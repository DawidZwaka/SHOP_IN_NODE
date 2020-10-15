class Fieldset {
  fields = {};

  setFieldProps = (key, props) => {
    this.fields[key] = { ...this.fields[key], ...props };
  };

  getFieldProp = (key, prop) => this.fields[key][prop];

  setValues = (values) => {
    for (const key in values) {
      const val = values[key];
      if (this.fields[key] !== undefined) this.fields[key].value = val;
    }
  };

  getFields = () => {
    const fieldset = JSON.parse(JSON.stringify(this.fields));

    return fieldset;
  };

  setRequiredProps = () => {
    for (const key in this.fields) {
      switch (this.fields[key].type) {
        case "imagePicker": {
          this.fields[key] = {
            ...this.fields[key],
            uploaded: "false",
          };
          break;
        }
      }
    }
  };

  constructor(obj) {
    this.fields = JSON.parse(JSON.stringify(obj));

    Object.keys(this.fields).forEach((key) => (this.fields[key].name = key));
    this.setRequiredProps();
  }
}

module.exports = Fieldset;
