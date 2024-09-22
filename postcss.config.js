const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })     //говорит о том, что нужно использовать стандартные настройки минификации
  ]
}; 