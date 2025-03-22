/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#4C1D95", // Deep academic purple
        secondary: "#9333EA", // Vibrant violet
        accent: "#14B8A6", // Cool cyan-green
        background: "#F3F4F6", // Soft gray
        card: "#E5E7EB", // Lighter gray for depth
        text: "#1F2937", // Dark gray text for readability
      },
    },
  },
  plugins: [],
};
