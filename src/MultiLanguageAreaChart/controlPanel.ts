import { t } from '@superset-ui/core';
import areaControlPanel from 'echarts-area-control-panel';

const multilingualTitleSection = {
  label: t('Titolo Multilingua'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'title_it',
        config: {
          type: 'TextControl',
          label: t('Titolo (IT)'),
          description: t('Titolo del grafico in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'title_en',
        config: {
          type: 'TextControl',
          label: t('Title (EN)'),
          description: t('Chart title in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'title_es',
        config: {
          type: 'TextControl',
          label: t('Título (ES)'),
          description: t('Título del gráfico en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'title_fr',
        config: {
          type: 'TextControl',
          label: t('Titre (FR)'),
          description: t('Titre du graphique en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

const metricLabelSection = {
  label: t('Etichetta Metrica Multilingua'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'metric_label_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta metrica (IT)'),
          description: t('Nome personalizzato della metrica in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_en',
        config: {
          type: 'TextControl',
          label: t('Metric label (EN)'),
          description: t('Custom metric name in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta métrica (ES)'),
          description: t('Nombre personalizado de la métrica en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette métrique (FR)'),
          description: t('Nom personnalisé de la métrique en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

export default {
  ...areaControlPanel,
  controlPanelSections: [
    multilingualTitleSection,
    metricLabelSection,
    ...areaControlPanel.controlPanelSections,
  ],
};
