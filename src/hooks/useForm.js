import { useState } from "react";

const useForm = (values) => {
  const [inputs, setInputs] = useState(values);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    const newValue =
      event.target.type === "number"
        ? Number(event.target.value)
        : event.target.value;
    setInputs((prevState) => ({ ...prevState, [event.target.name]: newValue }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useForm;
