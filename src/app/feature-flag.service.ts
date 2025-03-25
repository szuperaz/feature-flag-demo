import { Injectable, signal, WritableSignal } from "@angular/core";
import flagsmith from "flagsmith";
import { environment } from "src/environments/environment";

export type FeatureFlag = "search";

@Injectable({
  providedIn: "root",
})
export class FeatureFlagService {
  featureFlags: WritableSignal<Record<FeatureFlag, boolean>>;

  constructor() {
    flagsmith.init({
      environmentID: environment.flagsmithEnvironmentId,
      onChange: (_, params) => {
        const changedFlags: Record<string, boolean> = {};
        params.flagsChanged?.forEach((flag) => {
          changedFlags[flag] = flagsmith.hasFeature(flag);
        });
        this.featureFlags.update((currentFlags) => ({
          ...currentFlags,
          ...changedFlags,
        }));
      },
      defaultFlags: {
        search: {
          enabled: true,
        },
      },
    });
    const flags: Record<FeatureFlag, boolean> = {
      search: flagsmith.hasFeature("search"),
    };
    this.featureFlags = signal(flags);
  }
}
