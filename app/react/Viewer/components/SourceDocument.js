import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setSelection, unsetSelection} from 'app/Viewer/actions/selectionActions';
import {resetReferenceCreation, highlightReference, activateReference, scrollToActive} from 'app/Viewer/actions/uiActions';
import Document from 'app/Viewer/components/Document';
import {createSelector} from 'reselect';

const selectSourceRange = createSelector(s => s.uiState, u => u.toJS().reference.sourceRange);
const selectHighlightedRef = createSelector(s => s.uiState, u => u.toJS().highlightedReference);
const selectActiveRef = createSelector(s => s.uiState, u => u.toJS().activeReference);

const selectReferences = createSelector(
  documentViewer => [documentViewer.doc, documentViewer.references],
  ([doc, refs]) => refs
  .filter(r => {
    return r.get('entity') === doc.get('sharedId');
  })
  .toJS()
);

const mapStateToProps = ({user, documentViewer}) => {
  return {
    snippets: documentViewer.sidepanel.snippets,
    selection: selectSourceRange(documentViewer),
    doScrollToActive: documentViewer.uiState.get('goToActive'),
    doc: documentViewer.doc,
    references: selectReferences(documentViewer),
    className: 'sourceDocument',
    highlightedReference: selectHighlightedRef(documentViewer),
    activeReference: selectActiveRef(documentViewer),
    executeOnClickHandler: !!documentViewer.targetDoc.get('_id'),
    disableTextSelection: !user.get('_id'),
    panelIsOpen: !!documentViewer.uiState.get('panel'),
    forceSimulateSelection: documentViewer.uiState.get('panel') === 'targetReferencePanel'
      || documentViewer.uiState.get('panel') === 'referencePanel'
  };
};

function mapDispatchToProps(dispatch) {
  let actions = {
    setSelection,
    unsetSelection,
    onClick: resetReferenceCreation,
    highlightReference,
    activateReference,
    scrollToActive
  };
  return bindActionCreators(actions, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {unsetSelection: dispatchProps.unsetSelection});
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Document);
