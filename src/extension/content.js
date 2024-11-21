const profile = JSON.parse(localStorage.getItem("job-application-profile") || "{}");

const mappings = {
    "first-name": "firstName",
    "last-name": "lastName",
    "email": "email",
    "phone": "phone",
    "resume": "resumeUrl",
    "linkedin": "linkedinUrl",
    "portfolio": "portfolioUrl"
};

document.querySelectorAll("input, textarea, select").forEach((input) => {
    const name = input.name.toLowerCase();
    const mappedKey = mappings[name] || Object.keys(profile).find((key) => name.includes(key.toLowerCase()));

    if (mappedKey && profile[mappedKey]) {
        input.value = profile[mappedKey];
        input.dispatchEvent(new Event("input", { bubbles: true }));
    }
});

alert("Form autofilled successfully!");
