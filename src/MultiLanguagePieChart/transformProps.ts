import { getMetricLabel, tooltipHtml } from '@superset-ui/core';
import originalTransformProps from 'pie-transform';
import getBootstrapData from 'superset-get-bootstrap-data';

const LOCALE: string = getBootstrapData().common.locale || 'en';

function localeKey(prefix: string): string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

export default function transformProps(chartProps: any) {
  const result = originalTransformProps(chartProps);
  const { formData } = chartProps;

  const { graphic, ...restOptions } = (result as any).echartOptions ?? {};
  let echartOptions: any = {
    ...restOptions,
    ...(graphic != null ? { graphic } : {}),
  };

  // ── Etichetta metrica ───────────────────────────────────────────────────────
  const customMetricLabel =
    (formData[localeKey('metricLabel')] as string) ||
    (formData.metricLabelEn as string) ||
    '';

  if (customMetricLabel) {

    if (Array.isArray(echartOptions.series)) {
      echartOptions = {
        ...echartOptions,
        series: echartOptions.series.map((s: any, i: number) =>
          i === 0 ? { ...s, name: customMetricLabel } : s,
        ),
      };
    }

    const originalFormatter = echartOptions.tooltip?.formatter;
    if (typeof originalFormatter === 'function') {
      echartOptions = {
        ...echartOptions,
        tooltip: {
          ...echartOptions.tooltip,
          formatter: (params: any) => {
            const [name, formattedValue, formattedPercent] = [
              params.name ?? '',
              params.value,
              params.percent,
            ];
            return tooltipHtml(
              [[customMetricLabel, String(formattedValue), `${formattedPercent}%`]],
              name,
            );
          },
        },
      };
    }
  }

  // ── Titolo multilingua ──────────────────────────────────────────────────────
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

  return { ...result, echartOptions };
}
