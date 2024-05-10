/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: { max: "930px" },
        mob_screen: { max: "630px" },
        mob_screen_closed: { min: "630px" },
        menu_bar_mob: { max: "400px" },
        card_div_sm: { max: "307px" },
        comments_icon: { max: "1000px" },
        new_document: { max: "450px" },
        calendar_mob: { max: "1200px" },
        calendar_full: { min: "1200px" },
        calendar_mob_small: {max: "350px"}
      },
    },
  },

  plugins: [
  ],
};
