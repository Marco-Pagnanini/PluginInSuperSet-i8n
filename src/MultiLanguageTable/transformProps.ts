import { TimeseriesTransformProps } from '@superset-ui/plugin-chart-echarts';
import getBootstrapData from 'superset-get-bootstrap-data';

const LOCALE: string = getBootstrapData().common.locale || 'en';

function localeKey(prefix: string): string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

function buildTooltipFormatter(metricLabel: string) {
  return (params: any) => {
    const rows = Array.isArray(params) ? params : [params];
    if (!rows.length) return '';

    const categoryName = rows[0].axisValue ?? rows[0].name ?? '';
    const lines = rows
      .filter((p: any) => p.value !== null && p.value !== undefined)
      .map((p: any) => {
        const label = metricLabel || p.seriesName;
        const value = Array.isArray(p.value) ? p.value[1] : p.value;
        return `<span style="display:inline-block;margin-right:4px;border-radius:2px;width:10px;height:10px;background-color:${p.color};"></span>${label}: <strong>${value}</strong>`;
      });

    return `<div style="font-weight:bold;margin-bottom:4px">${categoryName}</div>${lines.join('<br/>')}`;
  };
}

export default function transformProps(chartProps: any) {
  const result = TimeseriesTransformProps({
    ...chartProps,
    formData: {
      ...chartProps.formData,
      seriesType: 'scatter',
    },
  });

  const { formData } = chartProps;

  const metricLabel =
    (formData[localeKey('metricLabel')] as string) ||
    (formData.metricLabelEn as string) ||
    '';

  let { echartOptions } = result as any;
  let { legendData, labelMap } = result as any;

  if (metricLabel) {
    // Rinomina serie
    if (echartOptions?.series) {
      echartOptions = {
        ...echartOptions,
        series: (echartOptions.series as any[]).map((s: any) => ({
          ...s,
          name: metricLabel,
        })),
      };
    }

    // Rinomina legenda
    if (echartOptions?.legend?.data) {
      echartOptions = {
        ...echartOptions,
        legend: {
          ...echartOptions.legend,
          data: (echartOptions.legend.data as any[]).map(() => metricLabel),
        },
      };
    }

    // Tooltip personalizzato
    echartOptions = {
      ...echartOptions,
      tooltip: {
        ...echartOptions.tooltip,
        formatter: buildTooltipFormatter(metricLabel),
      },
    };

    // Aggiorna legendData e labelMap
    const originalNames: string[] = legendData ?? [];
    legendData = originalNames.map(() => metricLabel);
    labelMap = {};
    originalNames.forEach((name: string) => {
      (labelMap as Record<string, any>)[metricLabel] = (result as any).labelMap?.[name];
    });
  }

  // Titolo multilingua
  const title =
    (formData[localeKey('title')] as string) ||
    (formData.titleEn as string) ||
    '';

  if (title) {
    echartOptions = {
      ...echartOptions,
      title: { text: title, left: 'center' },
    };
  }

  return { ...result, echartOptions, legendData, labelMap };
}
