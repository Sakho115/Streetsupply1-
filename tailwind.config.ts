import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'128': '32rem'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'slide-down': 'slideDown 0.6s ease-out',
				'slide-in-right': 'slideInRight 0.5s ease-out',
				'slide-in-left': 'slideInLeft 0.5s ease-out',
				'zoom-in': 'zoomIn 0.5s ease-out',
				'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
				'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
				'spin-slow': 'spin 3s linear infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'gradient-x': 'gradientX 3s ease infinite',
				'gradient-y': 'gradientY 3s ease infinite',
				'gradient-xy': 'gradientXY 3s ease infinite',
				'text-shimmer': 'textShimmer 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'bob': 'bob 1s ease-in-out infinite',
				'swing': 'swing 1s ease-in-out infinite',
				'rubber-band': 'rubberBand 1s ease-in-out',
				'heart-beat': 'heartBeat 1s ease-in-out infinite',
				'flash': 'flash 1s ease-in-out infinite',
				'shake-x': 'shakeX 1s ease-in-out',
				'shake-y': 'shakeY 1s ease-in-out'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideDown: {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				zoomIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				pulseSoft: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				glow: {
					'0%': { boxShadow: '0 0 5px hsl(var(--primary))' },
					'100%': { boxShadow: '0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))' }
				},
				gradientX: {
					'0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
					'50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' }
				},
				gradientY: {
					'0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'center top' },
					'50%': { backgroundSize: '200% 200%', backgroundPosition: 'center bottom' }
				},
				gradientXY: {
					'0%, 100%': { backgroundSize: '400% 400%', backgroundPosition: 'left center' },
					'50%': { backgroundSize: '400% 400%', backgroundPosition: 'right center' }
				},
				textShimmer: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				bob: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				swing: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'20%': { transform: 'rotate(15deg)' },
					'40%': { transform: 'rotate(-10deg)' },
					'60%': { transform: 'rotate(5deg)' },
					'80%': { transform: 'rotate(-5deg)' }
				},
				rubberBand: {
					'0%': { transform: 'scale3d(1, 1, 1)' },
					'30%': { transform: 'scale3d(1.25, 0.75, 1)' },
					'40%': { transform: 'scale3d(0.75, 1.25, 1)' },
					'50%': { transform: 'scale3d(1.15, 0.85, 1)' },
					'65%': { transform: 'scale3d(0.95, 1.05, 1)' },
					'75%': { transform: 'scale3d(1.05, 0.95, 1)' },
					'100%': { transform: 'scale3d(1, 1, 1)' }
				},
				heartBeat: {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.3)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.3)' },
					'70%': { transform: 'scale(1)' }
				},
				flash: {
					'0%, 50%, 100%': { opacity: '1' },
					'25%, 75%': { opacity: '0' }
				},
				shakeX: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
				},
				shakeY: {
					'0%, 100%': { transform: 'translateY(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateY(-10px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateY(10px)' }
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'mesh-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 25%, hsl(var(--success)) 50%, hsl(var(--warning)) 75%, hsl(var(--primary)) 100%)'
			},
			boxShadow: {
				'glow': '0 0 20px hsl(var(--primary) / 0.3)',
				'glow-lg': '0 0 40px hsl(var(--primary) / 0.4)',
				'glow-xl': '0 0 60px hsl(var(--primary) / 0.5)',
				'inner-glow': 'inset 0 0 20px hsl(var(--primary) / 0.2)',
				'neon': '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'
			},
			backdropBlur: {
				xs: '2px'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['CalSans-SemiBold', 'Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
