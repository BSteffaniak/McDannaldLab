// List of files to check for errors or formatting issues.
window.checkFormattingFiles = ["/scripts/warningExample.js", "/scripts/errorExample.js", "/scripts/people.js", "/scripts/publications.js"];

/**
 * Description of what the publicication JSON properties require.
 */
window.publicationPropertyChecker = {
    header: {
        type: "string",
        optional: false
    },
    date: {
        type: "date",
        format: "MM/DD/YYYY",
        optional: false
    },
    fileUrl: {
        type: "url",
        optional: true
    }
};

/**
 * Description of what the people JSON properties require.
 */
window.peoplePropertyChecker = {
    name: {
        type: "string",
        optional: false
    },
    description: {
        type: "string",
        optional: false
    },
    imageUrl: {
        type: "image",
        optional: false
    },
    titles: {
        type: "array",
        optional: true
    },
    email: {
        type: "email",
        optional: true
    },
    cvUrl: {
        type: "url",
        optional: true
    }
};

/**
 * Tell the format checker what the name of the variable that is generated
 * from the script is and set the checker property.
 */
window.customPropertyChecking = {
    "/scripts/warningExample.js": {
        export: "warnings",
        model: window.publicationPropertyChecker,
    },
    "/scripts/errorExample.js": {
        export: "errors",
        model: window.publicationPropertyChecker,
    },
    "/scripts/people.js": {
        export: "people",
        model: window.peoplePropertyChecker,
    },
    "/scripts/publications.js": {
        export: "publications",
        model: window.publicationPropertyChecker
    }
};