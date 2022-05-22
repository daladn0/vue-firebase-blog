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