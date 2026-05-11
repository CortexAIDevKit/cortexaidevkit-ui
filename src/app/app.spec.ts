import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TranslateLoader, provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import en from '../../public/assets/i18n/en.json';

class TestTranslateLoader extends TranslateLoader {
  getTranslation() {
    return of(en);
  }
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(TestTranslateLoader),
          fallbackLang: 'en',
          lang: 'en',
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Cortex AI Dev Kit');
  });
});
