import { useReducer } from "react";
import "./index.css";
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.name };
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PHONE":
      return { ...state, phone: action.phone };
    default:
      return { ...state };
  }
};
const error_reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME_ERROR":
      return { ...state, name_error: action.name_error };
    case "SET_EMAIL_ERROR":
      return { ...state, email_error: action.email_error };
    case "SET_PHONE_ERROR":
      return { ...state, phone_error: action.phone_error };
    default:
      return { ...state };
  }
};

const Form = () => {
  const form_state = {
    name: "",
    email: "",
    phone: "",
  };
  const error_form_state = {
    name_error: "",
    email_error: "",
    phone_error: "",
  };
  const [state_form, dispatch_values] = useReducer(reducer, form_state);
  const [state_error, dispatch_error] = useReducer(
    error_reducer,
    error_form_state
  );

  function check_and_update(flag, val) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const namePattern = /^[a-zA-Z][a-zA-Z ]{2,}/;

    switch (flag) {
      case "NAME":
        if (namePattern.test(val) === true) {
          dispatch_values({ type: "SET_NAME", name: val });
          dispatch_error({
            type: "SET_NAME_ERROR",
            name_error: "",
          });
        } else {
          dispatch_values({ type: "SET_NAME", name: val });
          dispatch_error({
            type: "SET_NAME_ERROR",
            name_error: "Invalid Name",
          });
        }
        if (val.length === 0)
          dispatch_error({
            type: "SET_NAME_ERROR",
            name_error: "",
          });
        break;
      case "EMAIL":
        if (emailPattern.test(val)) {
          dispatch_values({ type: "SET_EMAIL", email: val });
          dispatch_error({
            type: "SET_EMAIL_ERROR",
            email_error: "",
          });
        } else {
          dispatch_error({
            type: "SET_EMAIL_ERROR",
            email_error: "Invalid Email",
          });
          dispatch_values({ type: "SET_EMAIL", email: val });
        }
        if (val.length === 0)
          dispatch_error({
            type: "SET_NAME_ERROR",
            name_error: "",
          });
        break;
      case "PHONE":
        if (typeof val !== "number") {
          dispatch_error({
            type: "SET_PHONE_ERROR",
            phone_error: "Phone number should be only numbers",
          });
          dispatch_values({ type: "SET_PHONE", phone: val });
        } else if (val.length < 10 && val.length > 0) {
          dispatch_error({
            type: "SET_PHONE_ERROR",
            phone_error: "Phone number should be of 10 digits",
          });
          dispatch_values({ type: "SET_PHONE", phone: val });
        } else {
          dispatch_values({ type: "SET_PHONE", phone: val });
          dispatch_error({
            type: "SET_PHONE_ERROR",
            phone_error: "",
          });
        }
        if (val.length === 0)
          dispatch_error({
            type: "SET_NAME_ERROR",
            name_error: "",
          });
        break;
      default:
        console.log("unethical");
        break;
    }
  }
  return (
    <div className="Form">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="form">
        <div className="input_box">
          <label htmlFor="name">Enter Name</label>
          <input
            name="name"
            value={state_form.name}
            onChange={(e) => check_and_update("NAME", e.target.value)}
            type="text"
          />
          <p style={{ color: "red" }}>{state_error.name_error}</p>
        </div>
        <div className="input_box">
          <label htmlFor="email">Enter Email</label>
          <input
            name="email"
            value={state_form.email}
            onChange={(e) => check_and_update("EMAIL", e.target.value)}
            type="text"
          />
          <p>{state_error.email_error}</p>
        </div>
        <div className="input_box">
          <label htmlFor="phone">Enter Phone No</label>
          <input
            name="phone"
            value={state_form.phone}
            onChange={(e) => check_and_update("PHONE", e.target.value)}
            type="text"
          />
          <p>{state_error.phone_error}</p>
        </div>
        <button onClick={() => console.log("data submitted!")}>
          {" "}
          Submit Data
        </button>
      </div>
      <div>
        <p>{state_form.name}</p>
        <p>{state_form.email}</p>
        <p>{state_form.phone}</p>
      </div>
    </div>
  );
};

export default Form;
