export const cn = (...classNames: (string | boolean)[]) => {
  return classNames.filter(className => !!className).join(" ");
};
