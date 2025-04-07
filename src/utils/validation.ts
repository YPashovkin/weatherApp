
const inputTextValidation = {
  isCorrect: (text: string) => {
    const regex = new RegExp(
      '^(?:[a-zA-Zа-яА-ЯёЁ ]{1,168})+$',
    );
    return regex.test(text);
  },
};


export {inputTextValidation};
