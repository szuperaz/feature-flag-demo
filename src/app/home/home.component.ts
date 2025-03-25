import { Component, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PackageComponent } from "../package/package.component";
import { Package } from "../package";

@Component({
  selector: "app-home",
  imports: [CommonModule, PackageComponent],
  template: `
    <section>
      <input #input type="text" placeholder="Filter by package name" />
      <button class="button" (click)="searchText.set(input.value)">
        Search
      </button>
    </section>
    <section class="results">
      @for (package of filteredPackages(); track package.id) {
      <app-package [package]="package"></app-package>
      }
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  packages: Package[] = [
    {
      id: 0,
      name: "Home Insurance",
      photo: "/assets/jacques-bopp-Hh18POSx5qk-unsplash.jpg",
    },
    {
      id: 1,
      name: "Car Insurance",
      photo: "/assets/dan-gold-N7RiDzfF2iw-unsplash.jpg",
    },
    {
      id: 2,
      name: "Travel Insurance - Europe",
      photo: "/assets/roman-kraft-g_gwdpsCVAY-unsplash.jpg",
    },
    {
      id: 3,
      name: "Travel Insurance - Global",
      photo: "/assets/ian-dooley-hpTH5b6mo2s-unsplash.jpg",
    },
    {
      id: 4,
      name: "Weather Insurance",
      photo: "/assets/wim-van-t-einde-uj7eb7CgqRk-unsplash.jpg",
    },
  ];
  searchText = signal("");
  filteredPackages = computed(() => {
    return this.packages.filter((p) =>
      p.name.toLowerCase().includes(this.searchText().toLowerCase())
    );
  });
}
