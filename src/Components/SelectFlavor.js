import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './Common.css';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SelectFlavor = (props) => {
    const [state, setState] = React.useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.updateFlavor(event.target.name, event.target.checked);
    };



    return (
        <div className="flavor-group">
            <div className="flavor-label">Select Your Favorite Flavor</div>
            <FormGroup row className="check-box-group">
                <FormControlLabel
                    control={<Checkbox checked={state.Chocolate} onChange={handleChange} name="Chocolate" />}
                    label="Chocolate"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.Mint}
                            onChange={handleChange}
                            name="Mint"
                            color="primary"
                        />
                    }
                    label="Mint"
                />
                <FormControlLabel
                    control={<GreenCheckbox checked={state.Sweet} onChange={handleChange} name="Sweet" />}
                    label="Sweet"
                />
            </FormGroup>
        </div>
    )
}

export default SelectFlavor;