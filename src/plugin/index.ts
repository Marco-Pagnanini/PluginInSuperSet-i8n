import { t, ChartMetadata, ChartPlugin, Behavior } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from "../images/logo.jpg"

export default class SupersetPluginChartHelloWorld extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Create Your Menu',
      name: t('Labware Menù'),
      thumbnail,
      behaviors: [Behavior.InteractiveChart],
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../SupersetPluginChartHelloWorld'),
      metadata,
      transformProps,
    });
  }
}
