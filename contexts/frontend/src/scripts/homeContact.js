const changeContent = (target, content) => {
  target.classList.add("opacity-0");
  setTimeout(() => {
    target.innerHTML = content;
    target.classList.remove("opacity-0");
  }, 200);
};

const homeContact = () => {
  const formProposal = document.querySelector("#formProposal");
  const button = formProposal.querySelector("button");
  /**
   *
   * @param {FormData} formData
   * @returns
   */
  const sendProposal = async (formData) => {
    changeContent(button, `Loading <i class="not-italic">📨</i>`);
    const response = await fetch(`${baseUrlBackend}/proposal`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        opinion: formData.get("opinion"),
        proposal: formData.get("proposal"),
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const data = await response.json();
    return data;
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await sendProposal(formData);
    button.classList.add("text-xs");
    changeContent(
      button,
      `Thank you very much for your proposal! <i class="not-italic">✅</i>`
    );
    setTimeout(() => {
      button.classList.remove("text-xs");
      changeContent(button, `Send proposal <i class="not-italic">📤</i>`);
    }, 5000);
  };
  formProposal.addEventListener("submit", handleSubmitProposal);
};

window.addEventListener("DOMContentLoaded", homeContact);
