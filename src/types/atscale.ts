export type AtScaleDimension = {
  name: string;
  caption?: string;
  description?: string;
};

export type AtScaleMeasure = {
  name: string;
  caption?: string;
  description?: string;
};

export type AtScaleCube = {
  name: string;
  caption?: string;
  measures: AtScaleMeasure[];
  dimensions: AtScaleDimension[];
};

export type AtScaleQuery = {
  mdx: string;
  cube: string;
};
