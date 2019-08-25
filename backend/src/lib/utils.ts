const ellipsisString = (value: string, max: number) => {
  let isOver = true;
  if (max > value.length) {
    max = value.length;
    isOver = false;
  }
  return value.substring(0, max) + (isOver ? "..." : "");
};

export { ellipsisString };
