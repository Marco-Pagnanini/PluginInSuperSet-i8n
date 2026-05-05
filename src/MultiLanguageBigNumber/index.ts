import { Behavior, t } from '@superset-ui/core';
import { EchartsChartPlugin } from '@superset-ui/plugin-chart-echarts';
import buildQuery from 'bignumber-total-build-query';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
// eslint-disable-next-line import/no-extraneous-dependencies
import thumbnail from '../images/bignumber.png';

export default class MultiLanguageBigNumberPlugin extends EchartsChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('bignumber-viz'),
      metadata: {
        behaviors: [Behavior.DrillToDetail],
        category: t('KPI'),
        description: t(
          'Big Number with multilingual subheader (IT, EN, ES, FR).',
        ),
        name: t('Multilingual Big Number'),
        tags: [t('KPI'), t('i18n')],
        thumbnail,
      },
      transformProps,
    });
  }
}
