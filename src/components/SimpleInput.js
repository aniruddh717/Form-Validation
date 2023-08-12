import { useState } from "react"; //not usinf useRef anymore

const SimpleInput = (props) => {
  // const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); rather than using a state we can use a var and define the value there
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";

  const addNameHandler = (event) => {
    setEnteredName(event.target.value);

    // if (event.target.value.trim() !== "") {   now there is no need of if satatement bcz we using a enteredNameIsValid var now
    //   setEnteredNameIsValid(true);
    // }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    // if (enteredName.trim() === "") {     now there is no need of if satatement bcz we using a enteredNameIsValid var now
    //   setEnteredNameIsValid(false);
    // }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    //   return;
    // }

    if (!enteredNameIsValid) {
      // updated above condition while using enteredNameIsValid
      return;
    }

    console.log(enteredName);
    // const enteredValue = nameInputRef.current.value;   no more need of ref now
    // console.log(enteredValue);

    // nameInputRef.current.value = "";
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClass = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          value={enteredName}
          type="text"
          id="name"
          onChange={addNameHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameInputIsInvalid && <p>Name must be entered</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
