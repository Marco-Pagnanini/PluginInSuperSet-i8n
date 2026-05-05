import { AnnotationType, Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'echarts-timeseries-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
// eslint-disable-next-line import/no-extraneous-dependencies
import thumbnail from '../images/logo.jpg';

export default class MultilingualBarChartPlugin extends EchartsChartPlugin {
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
        category: t('Evolution'),
        description: t(
          'Bar chart with configurable title per language (IT, EN, ES, FR).',
        ),
        supportedAnnotationTypes: [
          AnnotationType.Event,
          AnnotationType.Formula,
          AnnotationType.Interval,
          AnnotationType.Timeseries,
        ],
        name: t('Multilingual Bar Chart'),
        tags: [t('ECharts'), t('Bar'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
