import { t } from '@superset-ui/core';
import bigNumberControlPanel from 'bignumber-total-control-panel';


const multilingualSection = {
  label: t('SubTitle'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'title_it',
        config: {
          type: 'TextControl',
          label: t('sub titolo (IT)'),
          description: t('Titolo in italiano'),
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
          description: t('Title in English'),
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
          description: t('Título en español'),
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
          description: t('Titre en français'),
          default: '',
          renderTrigger: true,
        },
      },
    ],
  ],
};

export default {
  ...bigNumberControlPanel,
  controlPanelSections: [
    multilingualSection,
    ...bigNumberControlPanel.controlPanelSections,
  ],
};
