function validateInput(value) {
  if (value.length < 5) {
    return 'at least 5 characters';
  }

  return false;
}

export { validateInput };
