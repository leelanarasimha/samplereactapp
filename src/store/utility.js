export const updateObject = (state, updatedproperties) => {
    return {
        ...state,
        ...updatedproperties
    };
}