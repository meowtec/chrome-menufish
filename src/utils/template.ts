const encode = (s: string) => encodeURIComponent(s).replace(/%20/g, '+');

export default function replaceTemplate(
  text: string,
  data: Record<string, string>,
  percentS = '',
): string {
  // compatible with chrome
  let txt = text
    .replace(/\{inputEncoding\}/g, 'utf-8')
    .replace(/%s/g, encode(percentS));

  Object.keys(data).forEach((key) => {
    txt = txt.replace(
      new RegExp(`{%${key}%}|{${key}}`, 'g'),
      encode(data[key]),
    );
  });

  return txt;
}
