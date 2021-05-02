import {ShotParams} from "./options.models";

export class RawShot {
  xCoordinate?: number;
  yCoordinate?: number;
  shotMadeFlag?: number;
  metadata?: Array<Metadata>;
}

export class ZonedShot {
  key?: string;
  bin?: string;
  shotAttempts?: number;
  shotMade?: number;
  shotValue?: number;
  frequency?: number;
}

export class Metadata {
  property?: string;
  value?: string;
}

