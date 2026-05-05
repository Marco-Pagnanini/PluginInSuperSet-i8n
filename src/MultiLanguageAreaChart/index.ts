import { Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'echarts-timeseries-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
// eslint-disable-next-line import/no-extraneous-dependencies
import thumbnail from '../images/logo.jpg';

export default class MultiLanguageAreaChartPlugin extends EchartsChartPlugin {
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
        description: t('Area chart with multilingual support (IT, EN, ES, FR).'),
        name: t('Multilingual Area Chart'),
        tags: [t('ECharts'), t('Area'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
