export const specialCharsRegex = /[!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\\`´]/;

export function handleKeyDown(
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLTextAreaElement>,
  inputValue: string | number | string[] | null | undefined,
  block: string
) {
  //condition to fix bug control+backspace on Windows/Linux
  if (
    (typeof inputValue === "string" &&
      (e.metaKey === true || e.ctrlKey === true) &&
      e.key === "Backspace" &&
      (inputValue === block ||
        inputValue?.charAt(inputValue?.length - 1) === " " ||
        specialCharsRegex.test(inputValue?.charAt(inputValue?.length - 1)))) ||
    (e.key === "Backspace" && e.ctrlKey === true)
  ) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (e.ctrlKey === true && e.key === "Backspace" && inputValue === block) {
    e.preventDefault();
    e.stopPropagation();
  }
}
