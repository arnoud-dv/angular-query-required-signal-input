import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { BasicExampleComponent } from "./app/basic-example.component";

bootstrapApplication(BasicExampleComponent, appConfig).catch((err) =>
  console.error(err),
);
