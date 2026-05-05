import { t } from '@superset-ui/core';
import mixedControlPanel from 'mixed-control-panel';

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

const metricLabelASection = {
  label: t('Etichetta Metrica A (Query 1)'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'metric_label_a_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta metrica A (IT)'),
          description: t('Nome della prima metrica in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_a_en',
        config: {
          type: 'TextControl',
          label: t('Metric A label (EN)'),
          description: t('First metric name in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_a_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta métrica A (ES)'),
          description: t('Nombre de la primera métrica en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_a_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette métrique A (FR)'),
          description: t('Nom de la première métrique en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

const metricLabelBSection = {
  label: t('Etichetta Metrica B (Query 2)'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'metric_label_b_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta metrica B (IT)'),
          description: t('Nome della seconda metrica in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_b_en',
        config: {
          type: 'TextControl',
          label: t('Metric B label (EN)'),
          description: t('Second metric name in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_b_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta métrica B (ES)'),
          description: t('Nombre de la segunda métrica en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'metric_label_b_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette métrique B (FR)'),
          description: t('Nom de la deuxième métrique en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

export default {
  ...mixedControlPanel,
  controlPanelSections: [
    multilingualTitleSection,
    metricLabelASection,
    metricLabelBSection,
    ...mixedControlPanel.controlPanelSections,
  ],
};
