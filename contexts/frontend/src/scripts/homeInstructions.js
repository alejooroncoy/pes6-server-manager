const homeInstructions = () => {
  const stepImages = document.querySelector("#stepImages");
  const numberSteps = document.querySelectorAll(".number-step");

  const stepsImageChildren = [...stepImages.childNodes].filter(
    (stepImage) => stepImage.nodeName === "IMG"
  );

  let index = 0;
  let asc = true;

  const numberStepsLoop = [...numberSteps];
  let lastStepNumberLoop = numberStepsLoop.at(index);

  let lastStepImage = stepsImageChildren.at(0);
  let lastStepNumber = [...numberSteps].at(0);

  const selectStep = (targetOrder) => {
    const url = new URL(lastStepImage.src);
    const ext = url.pathname.split(".").at(1);
    if (ext === "gif") {
      url.searchParams.append("time", new Date().getTime());
      lastStepImage.src = url.toString();
    }
    const { order } = targetOrder.dataset;
    if (lastStepImage?.dataset.order !== order) {
      lastStepNumber.classList.remove("active-step");
      lastStepImage?.classList.remove("active");
    }
    const stepImage = stepsImageChildren.at(order);
    stepImage.classList.add("active");
    targetOrder.classList.add("active-step");
    lastStepImage = stepImage;
    lastStepNumber = targetOrder;
    index = order;
  };

  const handleStepLoop = () => {
    if (asc) index++;
    else if (index) index--;
    if (index >= numberStepsLoop.length) {
      asc = false;
      index -= 2;
    }
    if (!index && !asc) asc = true;
    lastStepNumberLoop = numberStepsLoop.at(index);
    selectStep(lastStepNumberLoop);
  };

  let intervalStep = setInterval(handleStepLoop, 8000);

  const handleClickStep = (e) => {
    selectStep(e.target);
    clearInterval(intervalStep);
    intervalStep = setInterval(handleStepLoop, 8000);
  };

  [...numberSteps].forEach((numberStep) => {
    numberStep.addEventListener("click", handleClickStep);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearInterval(intervalStep);
    } else {
      intervalStep = setInterval(handleStepLoop, 8000);
    }
  });
};

window.addEventListener("DOMContentLoaded", homeInstructions);
