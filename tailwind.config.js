module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '100px': '100px',
        '250px': '250px',
        '3/4': '80%',
      },
      minWidth: {
        '250px': '250px',
      },
      colors: {
        gray: {
          350: '#C8CBD1'
        }
      }
    },
  },
  plugins: [],
}
