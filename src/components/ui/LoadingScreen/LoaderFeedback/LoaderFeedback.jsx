// Funcionalidades / Libs:
// import Cookies from "js-cookie";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:

// Utils:

// Assets:
import imgCircle from '../../../../assets/images/totem-calculoCircle.webp';

// Estilo:
import './loaderfeedback.css';


// LoaderFeedback.propTypes = {
//     textFeedback: PropTypes.string,
//     heightStretch: PropTypes.bool
// }
export function LoaderFeedback({ textFeedback, heightStretch }) {
    

    return (
        <div className={`LoaderFeedback ${heightStretch ? 'heightStretch' : ''}`}>
            {/* <span className="loader_content"></span> */}

            <div className="animate_img">
                <img className='img' src={imgCircle} alt="" />

                {textFeedback && <p>{textFeedback}</p>}
            </div>
        </div>
    )        
}