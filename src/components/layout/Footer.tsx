'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
  EnvelopeClosedIcon,
  ArrowTopRightIcon,
} from '@radix-ui/react-icons';

const footerLinks = {
  organization: [
    { label: 'About', href: '/#about' },
    { label: 'Team', href: '/team' },
    { label: 'Events', href: '/events' },
    { label: 'Projects', href: '/projects' },
  ],
  resources: [
    { label: 'Notices', href: '/notices' },
    { label: 'Contests', href: '/contests' },
    { label: 'Wall of KL', href: '/wall' },
    { label: 'Join EFIT', href: '/join' },
  ],
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/efit-kl', icon: GitHubLogoIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/efit-kl', icon: LinkedInLogoIcon },
  { label: 'Instagram', href: 'https://instagram.com/efit_kl', icon: InstagramLogoIcon },
];

export function Footer() {
  const pathname = usePathname();
  const isInternalPage = pathname?.startsWith('/admin') || pathname?.startsWith('/portal');

  if (isInternalPage) return null;

  return (
    <footer className="relative mt-auto border-t border-[var(--color-border)]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-blue-1)] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-xl tracking-wider text-white">
                EFIT
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-white-muted)] leading-relaxed max-w-[260px]">
              Engineer&apos;s Fine-tuned with Information Technology.
              B.Tech CS&IT Student Body, KL University.
            </p>
            <a
              href="mailto:efit@kluniversity.in"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--color-white-dim)]
                hover:text-[var(--color-blue-3)] transition-colors"
            >
              <EnvelopeClosedIcon className="w-3.5 h-3.5" />
              efit@kluniversity.in
            </a>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="text-xs font-mono font-medium tracking-widest text-[var(--color-white-dim)] uppercase mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-white-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-mono font-medium tracking-widest text-[var(--color-white-dim)] uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-white-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Join CTA */}
          <div>
            <h4 className="text-xs font-mono font-medium tracking-widest text-[var(--color-white-dim)] uppercase mb-4">
              Get Involved
            </h4>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                rounded-[var(--radius-pill)] border border-[var(--color-border)]
                text-white hover:border-[var(--color-blue-1)] hover:shadow-[var(--shadow-glow)]
                transition-all duration-300"
            >
              Join EFIT
              <ArrowTopRightIcon className="w-3.5 h-3.5" />
            </Link>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-[var(--color-white-dim)] hover:text-white
                    hover:bg-white/[0.06] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-white-dim)]">
            © {new Date().getFullYear()} EFIT · KL University. All rights reserved.
          </p>
          <p className="text-xs font-mono text-[var(--color-white-dim)]">
            CS & IT / KL / {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
