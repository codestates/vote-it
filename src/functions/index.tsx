export const copyClipboard = async (
  text: string,
  successAction?: () => void,
  failAction?: () => void,
) => {
  try {
    await navigator.clipboard.writeText(text);
    successAction && successAction();
  } catch (err) {
    failAction && failAction();
  }
};
