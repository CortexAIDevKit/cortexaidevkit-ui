import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { ThemeService } from "./core/theme/theme.service";
import { ThemeToggle } from "./core/theme/theme-toggle";

@Component({
  selector: "cai-root",
  imports: [RouterOutlet, TranslatePipe, ThemeToggle],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("cortextaidevkit-ui");
  protected readonly theme = inject(ThemeService);
}
