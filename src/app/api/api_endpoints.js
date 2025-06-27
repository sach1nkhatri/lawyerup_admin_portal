const BASE_URL = process.env.REACT_APP_API_URL;
const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API = {
    BASE_URL,
    UPLOADS_URL,
    SERVER_URL,

    // ------------------ Lawyer Endpoints ------------------
    GET_ALL_LAWYERS: `${BASE_URL}lawyers`,
    UPDATE_LAWYER_STATUS: (id) => `${BASE_URL}lawyers/${id}/status`,
    DELETE_LAWYER: (id) => `${BASE_URL}lawyers/${id}`,

    // ------------------ FAQ Endpoints ------------------
    FAQ: {
        GET: `${BASE_URL}faqs`,
        CREATE: `${BASE_URL}faqs`,
        DELETE: (id) => `${BASE_URL}faqs/${id}`,
    },

    // ------------------ Auth ------------------
    ADMIN_LOGIN: `${BASE_URL}auth/admin-login`,
    VERIFY_ADMIN: `${BASE_URL}auth/verify-token`,

    // ------------------ File Uploads ------------------
    UPLOAD_PDF: `${BASE_URL}upload/pdf`,
    UPLOAD_LAWYER_LICENSE: `${BASE_URL}upload/license`,
    UPLOAD_PROFILE_PHOTO: `${BASE_URL}upload/photo`,

    // ------------------ News Management ------------------
    NEWS: {
        GET_ALL: `${BASE_URL}news`,
        CREATE: `${BASE_URL}news`,
        UPDATE: (id) => `${BASE_URL}news/${id}`, // ✅ NOT 'update/${id}'
        DELETE: (id) => `${BASE_URL}news/${id}`,
    },
    //------------------- PDF Management---------------------
    PDFS: {
        GET_ALL: `${BASE_URL}pdfs`,
        UPLOAD: `${BASE_URL}pdfs/upload`,
        DELETE: (id) => `${BASE_URL}pdfs/${id}`,
    },

    // ------------------ Analytics (Example) ------------------
    ANALYTICS: {
        REVENUE_STATS: `${BASE_URL}analytics/revenue`,
        USER_PLANS: `${BASE_URL}analytics/user-plans`,
    },
};

export default API;
