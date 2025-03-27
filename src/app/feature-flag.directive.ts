import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  effect,
  input,
  computed,
} from "@angular/core";
import { FeatureFlag, FeatureFlagService } from "./feature-flag.service";

@Directive({
  selector: "[appFeatureFlag]",
})
export class FeatureFlagDirective {
  appFeatureFlag = input<FeatureFlag>();
  appFeatureFlagValue = input<boolean>(true);

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
    private featureFlagService: FeatureFlagService
  ) {
    effect(() => {
      const isOn = computed(
        () =>
          this.featureFlagService.featureFlags()[this.appFeatureFlag()!] ===
          this.appFeatureFlagValue()
      );
      if (isOn()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
