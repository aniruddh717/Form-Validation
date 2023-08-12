import { useState, useEffect } from "react"; //not usinf useRef anymore

const SimpleInput = (props) => {
  // const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); rather than using a state we can use a var and define the value there
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid =
  enteredEmail.trim() !== "" &&
    enteredEmail.includes("@") &&
    enteredEmail.includes(".com");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const addNameHandler = (event) => {
    setEnteredName(event.target.value);

    // if (event.target.value.trim() !== "") {   now there is no need of if satatement bcz we using a enteredNameIsValid var now
    //   setEnteredNameIsValid(true);
    // }
  };

  const addEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim() === "") {     now there is no need of if satatement bcz we using a enteredNameIsValid var now
    //   setEnteredNameIsValid(false);
    // }
  };

  const nameEmailBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

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
    setEnteredName("");
    setEnteredNameTouched(false);
    
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClass = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = emailInputIsInvalid
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
      {emailInputIsInvalid && <p>Please enter a valid name</p>}

      <div className={emailInputClass}>
        <label htmlFor="email">Your E-mail</label>
        <input
          // ref={nameInputRef}
          value={enteredEmail}
          type="email"
          id="email"
          onChange={addEmailHandler}
          onBlur={nameEmailBlurHandler}
        />
      </div>
      {emailInputIsInvalid && <p>Please enter a valid email</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
