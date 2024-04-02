
import PropagateLoader	 from "react-spinners/PropagateLoader";
import PropTypes from 'prop-types';
const Loader = ({size, color}) => {
  return (
    <div className="container">
      <div className="row loader">
        <div className="col  d-flex align-items-center justify-content-center p-2">
          <PropagateLoader	 size={size} color={color} />
        </div>
      </div>
    </div>
  );
};
Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Loader.defaultProps = {
  size: 32,
  color: '#2875cc',
};


export default Loader;