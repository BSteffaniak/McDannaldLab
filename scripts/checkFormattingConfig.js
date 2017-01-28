window.checkFormattingFiles = ["/scripts/warningExample.js", "/scripts/errorExample.js", "/scripts/people.js", "/scripts/publications.js"];

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