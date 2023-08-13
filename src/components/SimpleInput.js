import { useState, useEffect } from "react"; //not using useRef anymore
import useInput from "../hooks/use-input"; //custom hook

const SimpleInput = (props) => {
  // const nameInputRef = useRef();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    reset: resetInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    reset: resetEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) =>
      value.trim() !== "" && value.includes("@") && value.includes(".com")
  );

  // {no more use of the below state because we using custom hook for this useInput()}
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredNameIsValid,setEnteredNameIsValid] = useState(false); rather than using a state we can use a var and define the value there

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // {no more use of the below conditions because we using custom hook for this useInput()}
  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // const enteredEmailIsValid =
  // enteredEmail.trim() !== "" &&
  //   enteredEmail.includes("@") &&
  //   enteredEmail.includes(".com");
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  // {no more use of the below functions because we using custom hook for this useInput()}
  // const addNameHandler = (event) => {
  //   setEnteredName(event.target.value);

  //   // if (event.target.value.trim() !== "") {   now there is no need of if satatement bcz we using a enteredNameIsValid var now
  //   //   setEnteredNameIsValid(true);
  //   // }
  // };
  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  //   // if (enteredName.trim() === "") {     now there is no need of if satatement bcz we using a enteredNameIsValid var now
  //   //   setEnteredNameIsValid(false);
  //   // }
  // };

  // const addEmailHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };
  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    //   return;
    // }

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      // updated above condition while using enteredNameIsValid
      return;
    }

    console.log(enteredName);
    // const enteredValue = nameInputRef.current.value;   no more need of ref now
    // console.log(enteredValue);

    // nameInputRef.current.value = "";

    resetInput();
    // setEnteredName("");
    // setEnteredNameTouched(false);

    resetEmail();
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
  };

  const nameInputClass = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = emailInputHasError
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
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameInputHasError && <p>Please enter a valid name</p>}

      <div className={emailInputClass}>
        <label htmlFor="email">Your E-mail</label>
        <input
          // ref={nameInputRef}
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailInputHasError && <p>Please enter a valid email</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
