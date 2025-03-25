import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Package } from "../package";

@Component({
  selector: "app-package",
  imports: [CommonModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="package.photo"
        alt="Photo for {{ package.name }}"
      />
      <h2 class="listing-heading">{{ package.name }}</h2>
    </section>
  `,
  styleUrls: ["./package.component.css"],
})
export class PackageComponent {
  @Input({ required: true }) package!: Package;
}
