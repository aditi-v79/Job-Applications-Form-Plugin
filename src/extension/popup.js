document.getElementById("autofill-button").addEventListener("click", () => {
    chrome.action.onClicked.addListener(() => {
        alert("Autofill triggered!");
    });
});
