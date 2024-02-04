import { ApplicationConfig } from "@angular/core";
import {
  provideAngularQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularQuery(new QueryClient()),
    provideHttpClient(withFetch()),
  ],
};
