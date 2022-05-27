import { useState } from "react";

const CardForm = (props) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addValue(value)
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>Value</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button>add</button>
    </form>
  );
};

export default CardForm;
