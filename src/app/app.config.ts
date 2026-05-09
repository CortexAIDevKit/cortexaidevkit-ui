import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: "/assets/i18n/",
        suffix: ".json",
      }),
      fallbackLang: "en",
      lang: import.meta.env.NG_APP_DEFAULT_LANGUAGE || "en",
    }),
    importProvidersFrom(LoggerModule.forRoot({ level: NgxLoggerLevel.INFO })),
  ],
};
