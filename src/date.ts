const Expired = (date: Date): boolean => {
    const now = new Date();
    return date < now;
  };

  export { Expired };