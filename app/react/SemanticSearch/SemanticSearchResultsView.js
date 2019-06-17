import React from 'react';

import { actions } from 'app/BasicReducer';
import RouteHandler from 'app/App/RouteHandler';
import SearchButton from 'app/Library/components/SearchButton';

import ResultsViewer from './components/SemanticSearchResults';
import semanticSearchAPI from './SemanticSearchAPI';

export default class SemanticSearchResultsView extends RouteHandler {
  static requestState({ searchId }, query, state) {
    return semanticSearchAPI.getSearch(searchId, state.semanticSearch.resultsFilters)
    .then(search => ({ semanticSearch: { search } }));
  }

  setReduxState(state) {
    this.context.store.dispatch(actions.set('semanticSearch/search', state.semanticSearch.search));
  }

  static renderTools() {
    return (
      <div className="searchBox">
        <SearchButton storeKey="library" />
      </div>
    );
  }

  render() {
    return <ResultsViewer />;
  }
}
