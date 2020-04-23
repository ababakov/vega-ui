import React, { useState } from "react";

import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const knobs = () => ({
  disabled: boolean("disabled", false),
  intermediate: boolean("intermediate", false),
  size: select("size", ["m", "l"], "m"),
  label: text("label", "Check me"),
});

storiesOf("ui/Checkbox", module)
  .addDecorator(withKnobs)
  .add("Чекбокс", () => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = () => {
      setChecked(checked);
    };

    return <Checkbox onChange={handleChange} checked={checked} {...knobs()} />;
  });
