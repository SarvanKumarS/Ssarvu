// Replace this with the deployed Google Apps Script web app URL.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuLerBcaEUbMwoVBCHjmspWtQyWwIj5pYUJtzvnq1rCPEiqfhXTHAFtAUXmWEfFQLl/exec";

const form = document.querySelector("#officer-form");
const statusMessage = document.querySelector("#status");
const submitButton = document.querySelector("#submit-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  if (SCRIPT_URL === "1GsuWnLsI0OyM1JERUHF2pcmJKTVUTI9K4j1YtXY8iVY") {
    showStatus("The form is not connected yet. Please contact the organizer.", true);
    return;
  }

  submitButton.disabled = true;
  showStatus("Sending your details…");

  try {
    // Apps Script handles this simple form-encoded request. In no-cors mode,
    // the browser does not expose the server response to this page.
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
    showStatus(
      "We couldn't send your details. Please check your connection and try again.",
      true
    );
  } finally {
    submitButton.disabled = false;
  }
});

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = `status ${isError ? "error" : "success"}`;
}
