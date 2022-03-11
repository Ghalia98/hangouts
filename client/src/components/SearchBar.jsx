import React from 'react';

function SearchBar(props) {
    const searchHandler = (e) => {
        props.setSearch(e.target.value)

    }
    return (
        <div id='search-bar'>
            <input type="text" id="title" placeholder='Search' onChange={searchHandler} value={props.search} />
        </div>
    )
}

export default SearchBar