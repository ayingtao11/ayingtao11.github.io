import "./Wrapper.css";

/*The Wrapper component will be the frame, holding all the children components in place. 
It will also allow us to center the whole app afterward.
*/
const Wrapper = ({ children }) => {
  return <div className="sciWrapper">{children}</div>;
};

export default Wrapper;