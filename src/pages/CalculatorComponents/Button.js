import "./Button.css";

/*
The Button component will provide the interactivity for the app. 
Each component will have the value and onClick props.

In the stylesheet, we’ll also include the styles for the equal button. 
We’ll use Button props to access the class later on.
*/
const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;