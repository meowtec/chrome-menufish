import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@mui/material';
import { groupCategories } from '../../../config/basic';
import {
  AppOptions,
  AppOptionsRules,
  MenuCategory,
  RulesGroup,
} from '../../../types';
import RuleGroup from '../RuleGroup';
import { confirm } from '../../../utils/confirm';
import { callMenuReload, readOptions, saveOptions } from '../../../services';
import defaultOptions from '../../../config/default-options';
import { showToast } from '../../../utils/toast';
import {
  clearLegacyData,
  readOptionsFromLegacyData,
} from '../../../utils/migrate';
import CodeEdit from '../CodeEdit';
import { useBool } from '../../../utils/use-bool';
import './index.scss';

function SettingsView({
  rules,
  optionsChanged,
  onRulesChange,
  onApply,
  onReset,
}: {
  rules: AppOptionsRules;
  optionsChanged: boolean;
  onRulesChange(rules: AppOptionsRules, applyImmediate: boolean): void;
  onApply(): void;
  onReset(): void;
}) {
  const {
    value: codeEditVisible,
    setTrue: setCodeEditToVisible,
    setFalse: setCodeEditToInvisible,
  } = useBool(false);
  const handleOptionsChange = (category: MenuCategory, options: RulesGroup) => {
    onRulesChange(
      {
        ...rules,
        [category]: options,
      },
      false,
    );
  };

  const handleReset = async () => {
    if (await confirm('确认重置到默认初始配置?', '重置后无法撤销')) {
      onReset();
    }
  };

  const handleCodeSubmit = (newRules: AppOptionsRules) => {
    onRulesChange(newRules, true);
  };

  return (
    <div className="page-panel" id="settings">
      <h2 className="sub-header">设置</h2>
      <div>
        {groupCategories.map((key) => (
          <RuleGroup
            key={key}
            category={key}
            options={rules[key]}
            onOptionsChange={handleOptionsChange}
          />
        ))}
      </div>

      <div className="settings-footer">
        <Button onClick={handleReset}>
          {chrome.i18n.getMessage('restore_default_settings')}
        </Button>
        <Button onClick={setCodeEditToVisible}>
          {chrome.i18n.getMessage('code_mode')}
        </Button>
        <Button
          variant="contained"
          disabled={!optionsChanged}
          onClick={onApply}
        >
          {chrome.i18n.getMessage('apply')}
        </Button>
      </div>
      {codeEditVisible && (
        <CodeEdit
          rules={rules}
          onSubmit={handleCodeSubmit}
          onClose={setCodeEditToInvisible}
        />
      )}
    </div>
  );
}

export default function Settings() {
  const [optionsChanged, setOptionsChanged] = useState(false);
  const [options, setOptions] = useState<AppOptions | null>(null);

  const apply = () => {
    setOptionsChanged(false);

    if (options) {
      callMenuReload();
    }
  };

  const debouncedApply = useDebouncedCallback(apply, 5000);

  const handleOptionsChange = (
    newOptions: AppOptions,
    applyImmediate: boolean,
  ) => {
    setOptionsChanged(true);
    setOptions(newOptions);
    saveOptions(newOptions);
    if (applyImmediate) {
      apply();
    } else {
      debouncedApply();
    }
  };

  const handleReset = () => {
    setOptions(defaultOptions);
    saveOptions(defaultOptions).then(callMenuReload);
    showToast('success', '重置成功');
  };

  useEffect(() => {
    const optionsFromLegacy = readOptionsFromLegacyData();

    if (optionsFromLegacy) {
      clearLegacyData();
      setOptions(optionsFromLegacy);
      saveOptions(optionsFromLegacy);
    } else {
      readOptions().then(setOptions);
    }
  }, []);
  const rules = options?.rules;

  const handleRulesChange = (
    newRules: AppOptionsRules,
    applyImmediate: boolean,
  ) => {
    handleOptionsChange(
      {
        ...options,
        rules: newRules,
      },
      applyImmediate,
    );
  };

  return rules ? (
    <SettingsView
      rules={rules}
      optionsChanged={optionsChanged}
      onRulesChange={handleRulesChange}
      onApply={apply}
      onReset={handleReset}
    />
  ) : null;
}
