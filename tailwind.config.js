/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
  
      extend: {
       
        fontSize: {
          '16px': '16.37px',
        },
        fontWeight: {
          '600': 600,
        },
        lineHeight: {
          '24px': '24.55px',
        },
        screens: {
          mobile_s: "100px",
          mobile_m: "375px",
          mobile_l: "425px",tab:"768px",
          laptop_s: "1024px",
          laptop_m: "1440px",
        },
        backgroundImage: {
          "custom-gradient":
            "linear-gradient(270.18deg, #036068 -14.27%, #596451 47.55%, #1E7C87 76.37%, #4C7950 107.69%, #1199A8 147.31%)",
            'custom-measurement-gradient': 'linear-gradient(254.03deg, #036068 -63.21%, #596451 -24.27%, #1199A8 97.66%, #74C27C 153.24%, #1199A8 223.54%)',
        },
        backgroundColor: {
          "custom-green": "rgba(17, 69, 41, 0.34)",
   "custom-gradient1":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 320.76%)",
      "custom-gradient": "linear-gradient(160.48deg, #F2F7FC 4.52%, #F8FCFF 44.74%, #DDECF9 102.82%)"
  
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          customBlue: '#004987',
  
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            1: "hsl(var(--chart-1))",
            2: "hsl(var(--chart-2))",
            3: "hsl(var(--chart-3))",
            4: "hsl(var(--chart-4))",
            5: "hsl(var(--chart-5))",
          },
          fontFamily: {
            omnes: ["Omnes", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
          jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
          },
        },
        keyframes: {
          "accordion-down": {
            from: {
              height: "0",
            },
            to: {
              height: "var(--radix-accordion-content-height)",
            },
          },
          "accordion-up": {
            from: {
              height: "var(--radix-accordion-content-height)",
            },
            to: {
              height: "0",
            },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate"),
      require('tailwind-scrollbar'),
  
    ],
  };
  
  