import fp from 'lodash/fp';
import _ from 'lodash';

import type { Node } from '../../types';

export const styleExtensionRegex = /\.s?css$/;

export const getDefaultImportStyleData = (node: Node): ?Object => {
  const importNode = fp.compose(
    fp.first,
    fp.filter({ type: 'ImportDefaultSpecifier' }),
    fp.get('specifiers'),
  )(node);

  // the default imported name
  const variableName = _.get(importNode, 'local.name');

  if (variableName) { // it had a default import
    // path from which it was imported
    const path = _.get(node, 'source.value');

    if (path && styleExtensionRegex.test(path)) {
      return { variableName, path, importNode };
    }
  }
};