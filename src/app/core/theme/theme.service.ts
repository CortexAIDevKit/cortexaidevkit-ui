import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly userChosen = signal(this.readStored() !== null);

  readonly theme = signal<Theme>(this.resolveInitialTheme());

  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const value = this.theme();
      if (!this.isBrowser) return;

      document.documentElement.classList.toggle('dark', value === 'dark');

      if (this.userChosen()) {
        try {
          localStorage.setItem(STORAGE_KEY, value);
        } catch {
          // ignore storage errors (private mode, quota)
        }
      }
    });
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.userChosen.set(true);
    this.theme.set(theme);
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';
    const stored = this.readStored();
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  private readStored(): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
