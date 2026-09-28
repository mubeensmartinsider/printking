/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.14em',
        wide:  '0.2em',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        /* ── Static brand palette ─────────────────────────── */
        obsidian:       '#0d0b09',
        carbon:         '#14110d',
        graphite:       '#1c1814',
        'graphite-dark':'#16140c',
        'graphite-warm':'#18150e',
        floating:       '#241f1a',
        copper:         '#b87333',
        silver:         '#c8c0b4',
        gold:           '#c5a05a',
        'gold-soft':    '#d8b978',
        'gold-600':     '#b08a45',
        'gold-muted':   'rgba(197,160,90,0.37)',
        platinum:       '#f0ebe2',
        whisper:        'rgba(255,255,255,0.08)',

        /* ── Semantic tokens (flip light ↔ dark via CSS var) ─ */
        // page backgrounds — channels so bg-surface-*/50 style tints work
        'surface-base':     'rgb(var(--surface-base-rgb) / <alpha-value>)',
        'surface-primary':  'rgb(var(--surface-primary-rgb) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--surface-elevated-rgb) / <alpha-value>)',
        'surface-floating': 'rgb(var(--surface-floating-rgb) / <alpha-value>)',
        'surface-hover':    'rgb(var(--surface-hover-rgb) / <alpha-value>)',
        'surface-glass':    'var(--surface-glass)',

        // readable text — expressed as RGB channels so alpha modifiers
        // (text-ink/55, text-ink-secondary/70) actually compile in Tailwind
        'ink':          'rgb(var(--ink-rgb) / <alpha-value>)',    // primary text
        'ink-secondary':'rgb(var(--ink-secondary-rgb) / <alpha-value>)', // secondary copy
        'ink-tertiary': 'rgb(var(--ink-tertiary-rgb) / <alpha-value>)',  // muted

        // gold tuned for TEXT on the current surface (see --text-gold)
        'gold-ink':     'rgb(var(--text-gold-rgb) / <alpha-value>)',

        // borders
        'border-soft':  'var(--color-border)',
        'border-strong':'var(--color-border-strong)',

        /* ── Shadcn / Radix ──────────────────────────────── */
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
      transitionTimingFunction: {
        'lux':      'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
