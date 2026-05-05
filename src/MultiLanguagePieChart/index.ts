import { Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'pie-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/piechart.png';

export default class MultiLanguagePieChartPlugin extends EchartsChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('pie-chart'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Part of a Whole'),
        description: t('Pie chart with multilingual title support (IT, EN, ES, FR).'),
        name: t('Multilingual Pie Chart'),
        tags: [t('ECharts'), t('Pie'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
