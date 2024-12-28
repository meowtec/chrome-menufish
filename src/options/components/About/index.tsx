export default function About({ version }: { version: string }) {
  return (
    <div className="page-panel" id="about">
      <h2 className="sub-header">{chrome.i18n.getMessage('about')}</h2>
      <h3>Zhihu</h3>
      <a
        href="https://www.zhihu.com/people/meowtec"
        target="_blank"
        rel="noreferrer"
      >
        www.zhihu.com/people/meowtec
      </a>
      <h3>github</h3>
      <a
        href="https://github.com/meowtec/chrome-menufish/"
        target="_blank"
        rel="noreferrer"
      >
        github.com/meowtec/chrome-menufish
      </a>
      <h3>{chrome.i18n.getMessage('version')}</h3>
      <p id="current-version">{version}</p>
    </div>
  );
}
