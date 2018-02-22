'use strict';

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function replaceSearchInField(field, value) {
  if (value[field].$search && field.indexOf('$') === -1) {
    value[field] = {
      $regex: new RegExp(escapeRegExp(value[field].$search), 'i')
    };
  } else if (field === '$or') {
    replaceSearchInArray(value[field]);
  }
}

function replaceSearchInArray(queries) {
  queries.forEach(query => replaceSearchInQuery(query));
}

function replaceSearchInQuery(query) {
  for (let field in query) {
    replaceSearchInField(field, query);
  }
}

module.exports = function () {
  return function (hook) {
    const query = hook.params.query;
    replaceSearchInQuery(query);
    hook.params.query = query;
    return hook;
  };
};
