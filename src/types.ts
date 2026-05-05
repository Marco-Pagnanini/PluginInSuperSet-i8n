export interface SupersetPluginChartHelloWorldStylesProps {
  height: number;
  width: number;
  headerFontSize: string;
  boldText: boolean;
  headerText:string;
}

export interface SupersetPluginChartHelloWorldProps extends SupersetPluginChartHelloWorldStylesProps {
  data: any[];
  cols: string[];
  emitFilter: boolean;
  setDataMask: (dataMask: any) => void;
}
