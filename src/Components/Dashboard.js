import React, { Component, Fragment } from 'react';
import SearchBox from './SearchBox';
import SelectFlavor from './SelectFlavor';
import ResultsTable from './ResultsTable';

class Dashboard extends Component {
    state = {
        data: [],
        favoriteItems: [],
        isLoaded: false,
        originalItems: []
    }

    updateFlavor = (favoriteItem, action) => {
        if (action && !this.state.favoriteItems.includes(favoriteItem))
            this.setState({ favoriteItems: [...this.state.favoriteItems, favoriteItem], data: [] }, () => this.getData());
        else {
            let items = [...this.state.favoriteItems];
            items = items.filter(i => i !== favoriteItem && i);
            this.setState({ favoriteItems: items, data: [] }, () => this.getData());
        }
    }

    getData = () => {
        this.state.favoriteItems.length && this.state.favoriteItems.forEach(item => {
            this.setState({ isLoaded: true });
            fetch(`http://35.222.236.92/flavors?filter=${item}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            data: [...this.state.data, ...result],
                            originalItems: [...this.state.data, ...result]
                        }, () => this.setState({ isLoaded: false }));
                    },
                    (error) => {
                        this.setState({
                            error
                        }, () => this.setState({ isLoaded: false }));
                    }
                );
        });
    }

    filterData = (filterWith) => {
        console.log(filterWith);
        if (!filterWith)
            return this.setState({ data: this.state.originalItems });
        let filterWithItems = this.state.originalItems.filter(i => {
            let valuesInItem = Object.values(i).toString().toLowerCase();
            if (valuesInItem.search(filterWith.toLowerCase()) !== -1)
                return i;
        });
        this.setState({ data: filterWithItems });
    }

    render() {
        return (
            <Fragment>
                <SelectFlavor updateFlavor={this.updateFlavor} />
                <SearchBox filterData={this.filterData} />
                <ResultsTable resultsData={this.state.data} loading={this.state.isLoaded} />
            </Fragment>
        );
    }
}

export default Dashboard;