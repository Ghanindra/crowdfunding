// /** @type {import('tailwindcss').Config} */
// export default {
//     content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure it scans all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
