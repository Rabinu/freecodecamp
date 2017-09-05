import mainApp from '../components/mainApp';
import {connect} from 'react-redux';
import {movePlayer} from '../actions'


const mapStateToProps = (state) => {

  return {state}
}
const MainContainer = connect(mapStateToProps,{movePlayer})(mainApp);

export default MainContainer;
