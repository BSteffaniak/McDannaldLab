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
