import { tooltipHtml } from '@superset-ui/core';
import originalTransformProps from 'waterfall-transform';
import { ASSIST_MARK, LEGEND, TOTAL_MARK } from 'waterfall-constants';
import getBootstrapData from 'superset-get-bootstrap-data';

const LOCALE: string = getBootstrapData().common.locale || 'en';
const TOKEN = '-';

function localeKey(prefix: string): string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

export default function transformProps(chartProps: any) {
  const result = originalTransformProps(chartProps);
  const { formData } = chartProps;

  // ── Leggi le etichette personalizzate nella lingua attiva ──
  const increaseLabel =
    (formData[localeKey('increaseLabel')] as string) ||
    (formData.increaseLabelEn as string) ||
    LEGEND.INCREASE;

  const decreaseLabel =
    (formData[localeKey('decreaseLabel')] as string) ||
    (formData.decreaseLabelEn as string) ||
    LEGEND.DECREASE;

  const totalLabel =
    (formData[localeKey('totalLabel')] as string) ||
    (formData.totalLabelEn as string) ||
    LEGEND.TOTAL;

  // Se nessuna etichetta è stata personalizzata, restituiamo il risultato originale
  const hasCustomLabel =
    increaseLabel !== LEGEND.INCREASE ||
    decreaseLabel !== LEGEND.DECREASE ||
    totalLabel !== LEGEND.TOTAL;

  if (!hasCustomLabel) {
    return result;
  }

  let { echartOptions } = result as any;

  // ── 1. Rinomina le serie per posizione (0=assist, 1=increase, 2=decrease, 3=total) ──
  if (Array.isArray(echartOptions?.series)) {
    echartOptions = {
      ...echartOptions,
      series: echartOptions.series.map((s: any, i: number) => {
        if (i === 1) return { ...s, name: increaseLabel };
        if (i === 2) return { ...s, name: decreaseLabel };
        if (i === 3) return { ...s, name: totalLabel };
        return s; // i === 0: assist, non toccare
      }),
    };
  }

  // ── 2. Rinomina la legenda ──
  if (echartOptions?.legend) {
    echartOptions = {
      ...echartOptions,
      legend: {
        ...echartOptions.legend,
        data: [increaseLabel, decreaseLabel, totalLabel],
      },
    };
  }

  // ── 3. Rinomina TOTAL_MARK sull'asse X ──
  if (Array.isArray(echartOptions?.xAxis?.data) && totalLabel !== TOTAL_MARK) {
    echartOptions = {
      ...echartOptions,
      xAxis: {
        ...echartOptions.xAxis,
        data: (echartOptions.xAxis.data as any[]).map((v: any) =>
          v === TOTAL_MARK ? totalLabel : v,
        ),
      },
    };
  }

  // ── 4. Sovrascrive il tooltip con le etichette personalizzate ──
  const defaultFormatter =
    (echartOptions as any)?.yAxis?.axisLabel?.formatter;
  const xAxisFormatter =
    (echartOptions as any)?.xAxis?.axisLabel?.formatter;

  echartOptions = {
    ...echartOptions,
    tooltip: {
      ...echartOptions.tooltip,
      formatter: (params: any) => {
        const paramsArray: any[] = Array.isArray(params) ? params : [params];

        // Trova la serie "attiva" (non assist, non TOKEN)
        const series = paramsArray.find(
          (p: any) =>
            p.seriesName !== ASSIST_MARK && p.data?.value !== TOKEN,
        );

        if (!series) return '';

        const isTotal = series.seriesName === totalLabel;

        const title = !isTotal
          ? xAxisFormatter
            ? xAxisFormatter(series.name, series.dataIndex)
            : String(series.name)
          : undefined;

        const rows: string[][] = [];

        if (!isTotal) {
          const rawValue = series.data?.originalValue;
          rows.push([
            series.seriesName,
            defaultFormatter ? defaultFormatter(rawValue) : String(rawValue),
          ]);
        }

        const totalSum = series.data?.totalSum;
        rows.push([
          totalLabel,
          defaultFormatter ? defaultFormatter(totalSum) : String(totalSum),
        ]);

        return tooltipHtml(rows, title);
      },
    },
  };

  return { ...result, echartOptions };
}
