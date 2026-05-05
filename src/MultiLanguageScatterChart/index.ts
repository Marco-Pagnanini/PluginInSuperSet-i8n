import { AnnotationType, Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'echarts-timeseries-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/scatterchart.png';

export default class MultiLanguageScatterChartPlugin extends EchartsChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('echarts-timeseries-chart'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        supportedAnnotationTypes: [
          AnnotationType.Event,
          AnnotationType.Formula,
          AnnotationType.Interval,
          AnnotationType.Timeseries,
        ],
        category: t('Evolution'),
        description: t('Scatter plot with multilingual metric label support (IT, EN, ES, FR).'),
        name: t('Multilingual Scatter Plot'),
        tags: [t('ECharts'), t('Scatter'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
