export const loadState = () => {
  try {
    const serialized = localStorage.getItem("state");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("state", serialized);
  } catch {}
};
