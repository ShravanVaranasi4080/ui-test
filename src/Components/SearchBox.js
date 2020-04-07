import React from "react";

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import './Common.css';

const SearchBox = (props) => {
    const [state, setState] = React.useState({});

    const handleChange = event => {
        setState({ value: event.target.value });
        props.filterData(event.target.value)
    }

    return (
        <div>
            <div className="search-box">
                <div className="search-label">
                    Please Search your item :
                </div>

                <InputBase
                    placeholder="Search…"
                    className="search-input"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleChange}
                />
                <div className="search-icon">
                    <SearchIcon onClick={() => props.filterData(state.value)} />
                </div>
            </div>
        </div>
    )
}

export default SearchBox;