import { TimeseriesTransformProps } from '@superset-ui/plugin-chart-echarts';
import getBootstrapData from 'superset-get-bootstrap-data';

const LOCALE: string = getBootstrapData().common.locale || 'en';

function localeKey(prefix: string): string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

/**
 * Sovrascrive il tooltip formatter di ECharts per usare il metricLabel
 */
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
      seriesType: 'bar',
    },
  });

  const { formData } = chartProps;

  // ── Titolo multilingua ──────────────────────────────────────────────────────
  const title =
    (formData[localeKey('title')] as string) ||
    (formData.titleEn as string) ||
    '';

  // ── Etichetta metrica multilingua ───────────────────────────────────────────
  const metricLabel =
    (formData[localeKey('metricLabel')] as string) ||
    (formData.metricLabelEn as string) ||
    '';

  let { echartOptions } = result;
  let { legendData, labelMap } = result;

  if (metricLabel && echartOptions?.series) {
    // 1. Rinomina tutte le serie (aggiorna legenda e label sui valori)
    const series = (echartOptions.series as any[]).map(s => ({
      ...s,
      name: metricLabel,
    }));

    // 2. Aggiorna la legenda ECharts
    const legend = echartOptions.legend
      ? { ...(echartOptions.legend as object), data: series.map(() => metricLabel) }
      : echartOptions.legend;

    // 3. Sovrascrive il tooltip per mostrare il metricLabel invece di SUM(...)
    const tooltip = {
      ...(echartOptions.tooltip as object),
      formatter: buildTooltipFormatter(metricLabel),
    };

    echartOptions = { ...echartOptions, series, legend, tooltip };

    // 4. Aggiorna legendData e labelMap per il cross-filtering di Superset
    const originalNames: string[] = result.legendData ?? [];
    legendData = originalNames.map(() => metricLabel);
    labelMap = {};
    originalNames.forEach(name => {
      (labelMap as Record<string, any>)[metricLabel] = result.labelMap?.[name];
    });
  }

  // ── Titolo ECharts ──────────────────────────────────────────────────────────
  if (title && echartOptions) {
    echartOptions = {
      ...echartOptions,
      title: { text: title, left: 'center' },
    };
  }

  return { ...result, echartOptions, legendData, labelMap };
}
