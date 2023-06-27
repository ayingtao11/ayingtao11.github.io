import "./ButtonBox.css";

/*
The ButtonBox component, similarly to the Wrapper component, 
will be the frame for the children — only this time for the Button components.
*/
const SciButtonBox = ({ children }) => {
  return <div className="sciButtonBox">{children}</div>;
};

export default SciButtonBox;