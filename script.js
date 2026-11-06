// Paste the deployed Google Apps Script Web App URL here.
// It must end with /exec, not a Google Sheets URL and not the GitHub Pages URL.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLsm4qS9PuF7YBD8Jgjqx6tT8KXJ5KE8Z-gRY5l_tFttnlfHkxYjxTt8nlvPF-tW50/exec";

const form = document.querySelector("#officer-form");
const statusMessage = document.querySelector("#status");
const submitButton = document.querySelector("#submit-button");

if (!form || !statusMessage || !submitButton) {
  console.error("Form elements not found.");
} else {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    showStatus("Sending your details…");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(new FormData(form))
      });

      form.reset();
      showStatus(
        "Your submission was sent. If you have any doubt, please contact the organizer."
      );
    } catch (error) {
      console.error(error);
      showStatus(
        "We couldn't send your details. Please check your connection and try again.",
        true
      );
    } finally {
      submitButton.disabled = false;
    }
  });
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = `status ${isError ? "error" : "success"}`;
}
