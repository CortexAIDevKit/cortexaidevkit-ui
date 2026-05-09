import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "cai-root",
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("cortextaidevkit-ui");
}
