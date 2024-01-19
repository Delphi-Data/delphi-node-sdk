type AtScaleField = {
  name: string;
  type: string;
  description?: string;
};

export type AtScaleMeasure = AtScaleField;
export type AtScaleDimension = AtScaleField;

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
