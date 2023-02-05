import { toast } from "react-toastify";

const logger = {
  /**
   *
   * @param {ToastContent<String>} text
   * @param {ToastOptions} options
   */
  log(text, options) {
    toast(text, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      ...options,
    });
  },
  /**
   *
   * @param {ToastContent<String>} text
   * @param {ToastOptions} options
   */
  warn(text, options) {
    toast(text, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "warning",
      ...options,
    });
  },
  /**
   *
   * @param {ToastContent<String>} text
   * @param {ToastOptions} options
   */
  error(text, options) {
    toast(text, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
      ...options,
    });
  },
};

export default logger;
