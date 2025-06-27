const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getFileUrl = (path) => {
    return path ? `${SERVER_URL}${path}` : '';
};
