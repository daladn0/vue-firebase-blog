export function focusInvalidInput(fields, entries, refs) {
  const invalidFields = [];

  // Setting proper order for inputs
  fields.forEach(({ name }) => {
    invalidFields.push({ ...entries[name], name });
  });

  // Focusing the very first invalid input
  invalidFields.every(({ name, valid }) => {
    if (!valid) {
      refs[name][0].focus();

      return false;
    }

    return true;
  });
}

export function getFieldClasses(error, touched) {
  return (error && touched) ?
    "ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500"
    : !error && touched
      ? "ring-green-500 border-green-500 focus:ring-green-600 focus:border-green-600"
      : "focus:ring-blue-500 focus:border-blue-500";
}

export function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

export function formatDate(time, options) {

  if (!time) return ''

  let dateOptions = null

  if (options) {
    dateOptions = options
  } else {
    dateOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
  }

  return new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(time * 1000))
}