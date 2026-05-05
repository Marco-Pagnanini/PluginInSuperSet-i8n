import { Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'echarts-timeseries-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
// eslint-disable-next-line import/no-extraneous-dependencies
import thumbnail from '../images/logo.jpg';

export default class MultiLanguageLineChartPlugin extends EchartsChartPlugin {
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
        description: t('Line chart with multilingual support (IT, EN, ES, FR).'),
        name: t('Multilingual Line Chart'),
        tags: [t('ECharts'), t('Line'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
