import { WhitespaceEncode } from '../types';

const encode = (s: string, wsPlus?: boolean) => {
  const encoded = encodeURIComponent(s);
  return wsPlus ? encoded.replace(/%20/g, '+') : encoded;
};

export default function replaceTemplate(
  text: string,
  data: Record<string, string>,
  percentS = '',
  options: {
    whitespaceEncode: WhitespaceEncode;
  },
): string {
  // compatible with chrome
  let txt = text
    .replace(/\{inputEncoding\}/g, 'utf-8')
    .replace(/%s/g, encode(percentS));

  Object.keys(data).forEach((key) => {
    txt = txt.replace(
      new RegExp(`{%${key}%}|{${key}}`, 'g'),
      encode(data[key], options.whitespaceEncode === '+'),
    );
  });

  return txt;
}
