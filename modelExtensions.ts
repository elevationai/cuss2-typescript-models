/**
 * Type extensions for cuss2-typescript-models
 *
 * These extensions add missing values to the generated types that are needed
 * by CUSS2 SDKs but are not present in the generated models.
 */

// Import the original enums
import {
  type ComponentState,
  ComponentTypes,
  CussDataTypes as _CussDataTypes,
  DeviceTypes,
  MediaTypes as _MediaTypes,
  type MessageCodes,
  type PlatformData,
} from "./mod.ts";

// Re-export other imports
export type {
  ApplicationActivation,
  ComponentCharacteristics,
  ComponentState,
  EnvironmentComponent,
  MessageCodes,
  PlatformData,
} from "./mod.ts";

/**
 * Proposed `currentComponentState` meta field (CUSS2 spec proposal).
 * When present in a platform message, provides the component's actual state
 * separately from the messageCode (which becomes purely a response/event code).
 */
export interface CurrentComponentState {
  componentState: ComponentState;
  /** The component's current state. */
  state?: MessageCodes;
  /**
   * @deprecated Some platforms emit the state under this name. `state` is correct; read
   * through {@link getComponentStateCode} so both shapes are handled.
   */
  status?: MessageCodes;
  enabled: boolean;
}

/**
 * The component state from a `currentComponentState`, preferring the correct `state` property
 * and falling back to the misnamed `status` that some platforms send.
 */
export function getComponentStateCode(
  ccs: CurrentComponentState,
): MessageCodes | undefined {
  return ccs.state ?? ccs.status;
}

/**
 * New unsolicited messageCode for component status change broadcasts.
 * Not yet in the upstream MessageCodes enum.
 */
export const COMPONENT_UPDATE = "COMPONENT_UPDATE" as unknown as MessageCodes;

/**
 * Safely extract `currentComponentState` from a platform message meta object.
 * Returns undefined when the platform does not support the new field,
 * allowing callers to fall back to legacy behavior.
 */
export function getCurrentComponentState(
  meta: PlatformData["meta"],
): CurrentComponentState | undefined {
  return (meta as unknown as Record<string, unknown>).currentComponentState as
    | CurrentComponentState
    | undefined;
}

// Re-export unchanged enums
export { ComponentTypes, DeviceTypes };

// Allow any string to be used
export type MediaTypes = _MediaTypes | string;
export type CussDataTypes = _CussDataTypes | string;

// Re-export the enum values under the same name using namespace merging
export const MediaTypes: typeof _MediaTypes = _MediaTypes;
export const CussDataTypes: typeof _CussDataTypes = _CussDataTypes;
