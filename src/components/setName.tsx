import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";

type Props = {};

export const SetName = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length != 0) {
      localStorage.setItem(`${localStorage.getItem("name")}`, value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-bold text-4xl">Name</h1>
      <form
        onSubmit={handleForm}
        className="flex flex-col items-center justify-center gap-y-4"
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="text-black"
        />
        <input type="submit" value="Submit" className="button text-xl" />
      </form>
    </div>
  );
};
