function isSameSet(a, b) {
  if (a.size !== b.size) return false;

  for (const el of a) {
    if (!b.has(el)) return false;
  }

  return true;
}

module.exports = {
  isSameSet,
};
