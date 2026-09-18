import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowUpRight = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

export const ArrowRight = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const Download = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
)

export const Github = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M8 19c-3 .9-3-1.5-4-2" />
  </svg>
)

export const Linkedin = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <path d="M2 9h4v12H2z" />
    <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
)

export const Mail = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)

export const Phone = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 2 2.3Z" />
  </svg>
)

export const MapPin = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const Code = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m8 9-3 3 3 3" />
    <path d="m16 9 3 3-3 3" />
    <path d="m14 5-4 14" />
  </svg>
)

export const Sparkles = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m12 3-1.4 3.6L7 8l3.6 1.4L12 13l1.4-3.6L17 8l-3.6-1.4L12 3Z" />
    <path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14Z" />
    <path d="m19 14-.8 2.2L16 17l2.2.8L19 20l.8-2.2L22 17l-2.2-.8L19 14Z" />
  </svg>
)

export const Menu = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

export const Close = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </svg>
)
