/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      night: {
        ...require('daisyui/src/colors/themes')['[data-theme=night]'],
        '--rounded-btn': '9999px',
        '--btn-text-case': 'normal-case',
        '--rounded-box': '1.25rem'
      }
    }]
  }
}

