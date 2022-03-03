import React from 'react';

function SearchBar(props) {
    const searchHandler = (e) => {
        props.setSearch(e.target.value)

    }
    return (
        <div>
            <input type="text" id="title" placeholder='Search' onChange={searchHandler} value={props.search} style={{ width: '300px', height: '30px', backgroundColor: 'rgb(255,255,255, 0.2)', color: 'black' }} />
        </div>
    )
}

export default SearchBar