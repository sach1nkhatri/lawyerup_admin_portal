const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('data:image')
        ? path
        : `${SERVER_URL}${path}`;
};
