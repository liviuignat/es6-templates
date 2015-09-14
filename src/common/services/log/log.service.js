export default {
  log: (message) => {
    return new Promise(() => {
      console.log(message);
    });
  }
};
