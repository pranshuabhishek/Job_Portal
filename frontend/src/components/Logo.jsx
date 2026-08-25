const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#2563EB" />
    <rect x="7" y="14" width="18" height="11" rx="2" stroke="white" strokeWidth="2" fill="none" />
    <path d="M12 14V11C12 9.9 12.9 9 14 9H18C19.1 9 20 9.9 20 11V14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="7" y1="19" x2="25" y2="19" stroke="white" strokeWidth="1.5" />
    <circle cx="25" cy="7" r="2.5" fill="#22C55E" />
  </svg>
);

export default Logo;