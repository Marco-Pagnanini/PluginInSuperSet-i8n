import originalTransformProps from 'mixed-transform';
import getBootstrapData from 'superset-get-bootstrap-data';

const LOCALE: string = getBootstrapData().common.locale || 'en';

function localeKey(prefix: string): string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

export default function transformProps(chartProps: any) {
  const result = originalTransformProps(chartProps);
  const { formData } = chartProps;

  let { echartOptions } = result as any;
  const seriesBreakdown: number = (result as any).seriesBreakdown ?? 0;

  // ── Etichette personalizzate ────────────────────────────────────────────────
  const customLabelA =
    (formData[localeKey('metricLabelA')] as string) ||
    (formData.metricLabelAEn as string) ||
    '';

  const customLabelB =
    (formData[localeKey('metricLabelB')] as string) ||
    (formData.metricLabelBEn as string) ||
    '';

  const hasCustomLabel = !!(customLabelA || customLabelB);

  if (hasCustomLabel) {
    // Leggi i nomi originali dalla legenda (già costruita dall'originale)
    const originalLegendData: string[] = Array.isArray(echartOptions?.legend?.data)
      ? [...echartOptions.legend.data]
      : [];

    // Mappa: nomeOriginale → labelCustom
    const nameMapping = new Map<string, string>();
    if (customLabelA) {
      originalLegendData.slice(0, seriesBreakdown).forEach((name: string) => {
        nameMapping.set(name, customLabelA);
      });
    }
    if (customLabelB) {
      originalLegendData.slice(seriesBreakdown).forEach((name: string) => {
        nameMapping.set(name, customLabelB);
      });
    }

    // 1. Rinomina series.name nella legenda e nel grafico
    if (Array.isArray(echartOptions?.series)) {
      echartOptions = {
        ...echartOptions,
        series: echartOptions.series.map((s: any) => {
          const custom = nameMapping.get(s.name as string);
          return custom ? { ...s, name: custom } : s;
        }),
      };
    }

    // 2. Rinomina legend.data
    if (Array.isArray(echartOptions?.legend?.data)) {
      echartOptions = {
        ...echartOptions,
        legend: {
          ...echartOptions.legend,
          data: originalLegendData.map(
            (name: string) => nameMapping.get(name) ?? name,
          ),
        },
      };
    }

    // 3. Override tooltip con tecnica "reverse-map":
    //    - passiamo al formatter originale i nomi ORIGINALI (così primarySeries.has funziona)
    //    - nel risultato HTML rimpiazziamo i vecchi nomi con quelli custom
    const origTooltipFormatter = echartOptions?.tooltip?.formatter;
    if (typeof origTooltipFormatter === 'function') {
      // Mappa inversa: labelCustom → nomeOriginale
      const reverseMap = new Map<string, string>();
      for (const [orig, custom] of nameMapping) {
        reverseMap.set(custom, orig);
      }

      echartOptions = {
        ...echartOptions,
        tooltip: {
          ...echartOptions.tooltip,
          formatter: (params: any) => {
            // Ripristina nomi originali nei params prima di chiamare il formatter
            const restore = (p: any) => ({
              ...p,
              seriesName: reverseMap.get(p.seriesName) ?? p.seriesName,
            });
            const restoredParams = Array.isArray(params)
              ? params.map(restore)
              : restore(params);

            let html: string = origTooltipFormatter(restoredParams);

            // Sostituisce i nomi originali con i label custom nell'HTML
            for (const [orig, custom] of nameMapping) {
              html = html.split(orig).join(custom);
            }

            return html;
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
