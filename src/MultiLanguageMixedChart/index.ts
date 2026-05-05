import { AnnotationType, Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'mixed-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/mixedchart.png';

export default class MultiLanguageMixedChartPlugin extends EchartsChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('mixed-chart'),
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
        description: t(
          'Mixed chart (bar + line) with multilingual labels for both metrics (IT, EN, ES, FR).',
        ),
        name: t('Multilingual Mixed Chart'),
        tags: [t('ECharts'), t('Line'), t('Bar'), t('Mixed'), t('i18n')],
        thumbnail,
        queryObjectCount: 2,
      },
      transformProps,
    });
  }
}
