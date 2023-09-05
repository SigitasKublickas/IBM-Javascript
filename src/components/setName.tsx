import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputDialog } from "./inputDialog";

type Props = {};

export const SetName = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length != 0) {
      localStorage.setItem(`name`, value);
      navigate("/");
    } else {
      setExpand(true);
    }
  };
  useEffect(() => {
    if (value.length == 0) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  }, [value]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-bold text-4xl">Name</h1>
      <form
        onSubmit={handleForm}
        className="flex flex-col items-center justify-center gap-y-4 w-4/12"
      >
        {expand && <InputDialog text="Must be at least 1 character !" />}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="text-black dropdown-search w-full"
        />
        <input type="submit" value="Submit" className="button text-xl w-full" />
      </form>
    </div>
  );
};
