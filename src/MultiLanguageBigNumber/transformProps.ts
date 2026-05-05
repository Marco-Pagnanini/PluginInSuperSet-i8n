import getBootstrapData from 'superset-get-bootstrap-data';
import bigNumberTransformProps from 'bignumber-total-transform';

const LOCALE: string = getBootstrapData().common.locale || 'en';

function localKey(prefix:string) :string {
  return `${prefix}${LOCALE.charAt(0).toUpperCase()}${LOCALE.slice(1)}`;
}

export default function transformProps(chartProps: any) {
  const result = bigNumberTransformProps(chartProps);
  const { formData } = chartProps;

  const subheader =
    (formData[localKey('title')] as string) ||
    (formData.titleEn as string) ||
    result.subheader ||
    '';

  return { ...result, subheader };
}
