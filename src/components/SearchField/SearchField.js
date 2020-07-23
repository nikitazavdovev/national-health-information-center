import React from "react";
import {useLocation, useRouteMatch, withRouter } from "react-router-dom";

import './SearchField.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchField = (props) => {
  let query = useQuery();
  let { url } = useRouteMatch();

  const handleInput = (e) => {
    let search = e.target.value ? `?search=${e.target.value}` : '';

    props.history.push({
      pathname: url,
      search
    })
  };

  return (
    <div className='search'>
      <input placeholder={props.placeholder} type="text" value={query.get('search') || ''} onChange={(e) => handleInput(e)} />
    </div>
  )
};

export default withRouter(SearchField);