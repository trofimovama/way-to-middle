export const renderTemplate = (html) =>
  document
  .createRange()
  .createContextualFragment(html)
