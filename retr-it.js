const { Input } = require('enquirer');
const prompt = new Input({
  name: 'username',
  message: 'What is your username in fact?'
});

module.exports = {
    prompt,
};
