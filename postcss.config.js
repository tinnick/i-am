const production = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    (production ? require('autoprefixer') : null),
    require('postcss-nested')
  ]
}
