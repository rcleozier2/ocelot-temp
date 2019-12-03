const cleanName = (name: string) => {
  if (!name) {
    return name;
  }

  const nameArray = name.split(" ");

  return `${nameArray[0]} ${nameArray[1]}`;
};

export default cleanName;
