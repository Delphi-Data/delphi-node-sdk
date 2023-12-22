import { Query } from '@cubejs-client/core';

export type CubeQuery = Query & Record<string, unknown>;

/*** CATALOG TYPES BELOW ***/
export type CubeDimension = {
  name: string;
  title: string;
  description?: string;
  type: string;
  shortTitle: string;
  isVisible?: boolean;
};

export type CubeMeasure = CubeDimension & {
  aggType: 'count' | 'number';
  cumulative: boolean;
  cumulativeTotal: boolean;
  drillMembers: string[];
  drillMembersGrouped: {
    measures: string[];
    dimensions: string[];
  };
};

export type CubeCube = {
  name: string;
  title: string;
  description?: string;
  measures: CubeMeasure[];
  dimensions: CubeDimension[];
};
