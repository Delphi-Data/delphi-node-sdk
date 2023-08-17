export type LookerQuery = {
  model: string;
  explore: string;
  fields?: string[] | null;
  pivots?: string[] | null;
  fill_fields?: string[] | null;
  filters?: Record<string, string> | null;
  filter_expression?: string | null;
  sorts?: string[] | null;
  limit?: string | null;
  column_limit?: string | null;
  total?: boolean | null;
  row_total?: string | null;
  subtotals?: string[] | null;
};

export type LookerFieldRaw = {
  can_filter?: boolean;
  default_filter_value?: string | null;
  description?: string | null;
  dimension_group?: string | null;
  error?: string | null;
  field_group_label?: string | null;
  field_group_variant?: string | null;
  fiscal_month_offset?: number;
  has_allowed_values?: boolean;
  hidden?: boolean;
  is_filter?: boolean;
  is_fiscal?: boolean;
  is_numeric?: boolean;
  is_timeframe?: boolean;
  can_time_filter?: boolean;
  label?: string;
  label_from_parameter?: string | null;
  label_short?: string;
  lookml_link?: string | null;
  measure?: boolean;
  name: string;
  strict_value_format?: boolean;
  parameter?: boolean;
  permanent?: boolean | null;
  primary_key?: boolean;
  project_name?: string | null;
  requires_refresh_on_sort?: boolean;
  scope?: string;
  sortable?: boolean;
  source_file?: string;
  source_file_path?: string;
  sql?: string | null;
  suggest_dimension?: string;
  suggest_explore?: string;
  suggestable?: boolean;
  suggestions?: string[] | null;
  tags?: string[];
  type?: string;
  value_format?: string | null;
  view?: string;
  view_label?: string;
  dynamic?: boolean;
  times_used?: number;
  original_view?: string;
};

export type LookerField = Pick<
  LookerFieldRaw,
  'name' | 'label' | 'description' | 'view' | 'view_label' | 'tags' | 'type'
> & {
  id: string;
  usagePct?: number;
  explore: {
    name: string;
    label: string | null | undefined;
    description: string | null | undefined;
  };
  model: {
    name: string;
    label: string | null | undefined;
  };
};
