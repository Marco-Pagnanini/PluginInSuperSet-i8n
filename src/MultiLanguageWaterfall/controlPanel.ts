import { t } from '@superset-ui/core';
import waterfallControlPanel from 'waterfall-control-panel';

const multilingualLabelsSection = {
  label: t('Etichette Multilingua'),
  expanded: true,
  controlSetRows: [
    // ── INCREASE ──────────────────────────────────────────────
    [
      {
        name: 'increase_label_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta Aumento (IT)'),
          description: t('Testo della barra "Aumento" in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'increase_label_en',
        config: {
          type: 'TextControl',
          label: t('Increase label (EN)'),
          description: t('Text for the "Increase" bar in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'increase_label_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta Aumento (ES)'),
          description: t('Texto de la barra "Aumento" en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'increase_label_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette Augmentation (FR)'),
          description: t('Texte de la barre "Augmentation" en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    // ── DECREASE ──────────────────────────────────────────────
    [
      {
        name: 'decrease_label_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta Diminuzione (IT)'),
          description: t('Testo della barra "Diminuzione" in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'decrease_label_en',
        config: {
          type: 'TextControl',
          label: t('Decrease label (EN)'),
          description: t('Text for the "Decrease" bar in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'decrease_label_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta Disminución (ES)'),
          description: t('Texto de la barra "Disminución" en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'decrease_label_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette Diminution (FR)'),
          description: t('Texte de la barre "Diminution" en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    // ── TOTAL ──────────────────────────────────────────────
    [
      {
        name: 'total_label_it',
        config: {
          type: 'TextControl',
          label: t('Etichetta Totale (IT)'),
          description: t('Testo della barra "Totale" in italiano'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'total_label_en',
        config: {
          type: 'TextControl',
          label: t('Total label (EN)'),
          description: t('Text for the "Total" bar in English'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'total_label_es',
        config: {
          type: 'TextControl',
          label: t('Etiqueta Total (ES)'),
          description: t('Texto de la barra "Total" en español'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
    [
      {
        name: 'total_label_fr',
        config: {
          type: 'TextControl',
          label: t('Étiquette Total (FR)'),
          description: t('Texte de la barre "Total" en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

export default {
  ...waterfallControlPanel,
  controlPanelSections: [
    multilingualLabelsSection,
    ...waterfallControlPanel.controlPanelSections,
  ],
};
