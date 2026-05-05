// Mock generico per i transformProps originali di Superset
const transformMock = (chartProps: any) => ({
  echartOptions: {
    series: [],
    legend: { data: [] },
    tooltip: { formatter: () => '' },
    xAxis: { axisLabel: { formatter: (v: any) => String(v) } },
    yAxis: { axisLabel: { formatter: (v: any) => String(v) } },
  },
  legendData: [],
  labelMap: {},
  width: 800,
  height: 600,
  formData: chartProps?.formData ?? {},
  setDataMask: () => {},
  onContextMenu: () => {},
  refs: {},
});

export default transformMock;
