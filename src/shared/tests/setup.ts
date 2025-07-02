import "@testing-library/jest-dom";

/**
 * Disable canvas context in test:
 * https://stackoverflow.com/a/48837087/5158372
 * TODO: if you have a better way to do this, please let me know
 */
HTMLCanvasElement.prototype.getContext = function () {
  // return whatever getContext has to return
  return null;
};
