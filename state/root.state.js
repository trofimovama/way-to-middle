export const notifyStateUpdated = () => {
  const jsonRootState = JSON.stringify(rootState);
  localStorage.setItem("data", jsonRootState);
};

export const restoreState = () => {
  const strRootArray = localStorage.getItem("data");
  const parsedRootState = JSON.parse(strRootArray);
  return parsedRootState;
};

// TODO: ?? to implement new data str-re here ?? [] => [{title: ..., items: [{...}, {...}, {...}]}]
export const rootState = restoreState() || [];
