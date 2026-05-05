import { ChartProps } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData, hooks = {} } = chartProps;
  const { setDataMask = () => {} } = hooks;

  console.log('[HW] formData keys:', Object.keys(formData));

  return {
    width,
    height,
    data: queriesData[0].data,
    cols: formData.cols || formData.groupby || [],
    boldText: formData.boldText ??  true,
    headerFontSize: formData.headerFontSize ??  'xl',
    headerText: formData.headerText ??  'Labware Menu',
    emitFilter: formData.emitFilter ??  true,
    setDataMask,
  };
}
