import { ChartMetadata, ChartPlugin, t } from '@superset-ui/core';
import buildQuery from 'waterfall-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/waterfallchart.png';

export default class MultiLanguageWaterfallPlugin extends ChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('waterfall-chart'),
      metadata: new ChartMetadata({
        category: t('Evolution'),
        description: t(
          'Waterfall chart with multilingual labels for Increase, Decrease and Total (IT, EN, ES, FR).',
        ),
        name: t('Multilingual Waterfall Chart'),
        tags: [t('ECharts'), t('Waterfall'), t('i18n')],
        thumbnail,
      }),
      transformProps,
    });
  }
}
