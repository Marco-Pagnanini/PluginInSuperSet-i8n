import React, { createRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import {
  SupersetPluginChartHelloWorldProps,
  SupersetPluginChartHelloWorldStylesProps,
} from './types';

const Styles = styled.div<SupersetPluginChartHelloWorldStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }
`;

export default function SupersetPluginChartHelloWorld(
  props: SupersetPluginChartHelloWorldProps,
) {
  const {
    data,
    height,
    width,
    boldText,
    headerFontSize,
    headerText,
    setDataMask,
    emitFilter,
    cols,
  } = props;

  const [selectedValue, setSelectedValue] = useState<any>(null);

  const filterCol = cols?.[0] ?? (data?.[0] ? Object.keys(data[0])[0] : null);

  const handleClick = (row: any) => {
    console.log("HeaderText: " + headerText)
    if (!filterCol) return;

    const value = row[filterCol];
    const isDeselect = selectedValue === value;

    setSelectedValue(isDeselect ? null : value);

    const mask = {
      extraFormData: isDeselect
        ? {}
        : {
            filters: [{ col: filterCol, op: 'IN', val: [value] }],
          },
      filterState: {
        value: isDeselect ? null : [value],
        selectedValues: isDeselect ? [] : [value],
      },
    };

    setDataMask(mask);
  };

  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles
      ref={rootElem}
      boldText={boldText}
      headerFontSize={headerFontSize}
      height={height}
      width={width}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          flexShrink: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <span style={{ marginRight: '10px', fontSize: '1.2em' }}>📋</span>
        <h3 style={{ margin: 0, flexGrow: 1 }}>{headerText ? headerText : "no"}</h3>
      </div>

      <div
        style={{
          overflowY: 'auto',
          flex: 1,
          marginTop: '10px',
          paddingRight: '5px',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Array.isArray(data) &&
            data.map((row: any, index: number) => {
              const label = Object.values(row)
                .filter(v => v !== null)
                .join(' - ');
              const isSelected = filterCol && selectedValue === row[filterCol];

              return (
                <li
                  key={index}
                  onClick={() => handleClick(row)}
                  style={{
                    padding: '10px 15px',
                    marginBottom: '8px',
                    backgroundColor: isSelected
                      ? '#e6f7f7'
                      : 'rgba(255,255,255,0.6)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    border: isSelected
                      ? '1px solid #00A699'
                      : '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      marginRight: '10px',
                      color: '#00A699',
                    }}
                  >
                    {index + 1}:
                  </span>
                  <span style={{ wordBreak: 'break-word' }}>{label}</span>
                </li>
              );
            })}
        </ul>

        {(!data || data.length === 0) && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            Nessun dato disponibile
          </div>
        )}
      </div>
    </Styles>
  );
}
