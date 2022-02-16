import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

const DashNav = (props) => {

    const {auth} = useSelector((state) => ({...state}));


    const adminItems = () => {
        return(
            <>
				<div className={`drag-drop-csv text-center ${props.bg ? 'background-green' : 'background-white'}`} onDragOver={props.handledrag} onDrop={props.handledrop} onDragEnter={props.dragenter} onDragLeave={props.dragleave}>Import products with Csv</div>
            </>
        )
    }

	const buyItems = () => {
        return(
            <>

            </>
        )
    }

	return (
		<div className="container-fluid nav-dash-bg d-flex justify-content-between pt-3 pb-3 align-items-center">
			<div className="w-100 logo-height d-flex flex-column justify-content-center">
				<Link to="/" className="dash-link">
					Leatwear
				</Link>
                <p style={{color: 'white', opacity: '0.7'}}>{auth.user.name.split(" ")[0]} | <span style={{fontWeight: 'bold'}}>{auth.user.role}</span></p>
			</div>
			<div className="items-cont-dash">
					{props.role == 'admin' || props.role == 'company' ? adminItems() : buyItems()}
			</div> 
		</div>
	);
};

export default DashNav;
