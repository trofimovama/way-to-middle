export const notifyStateUpdated = () => {
  const jsonRootState = JSON.stringify(rootState);
  localStorage.setItem("data", jsonRootState);
};

export const restoreState = () => {
  const strRootArray = localStorage.getItem("data");
  const parsedRootState = JSON.parse(strRootArray);
  return parsedRootState;
};

export const rootState = restoreState() || [];
