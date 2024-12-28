import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { AppOptionsRules } from '../../../types';
import {
  LegacyRules,
  transformLegacyDataToRules,
} from '../../../utils/migrate';
import { normalizeRules } from '../../../utils/normalize';
import './index.scss';

interface CodeEditProps {
  rules: AppOptionsRules;
  onSubmit(rules: AppOptionsRules): void;
  onClose(): void;
}

function parseCodeAsRules(code: string): AppOptionsRules | null {
  const data: unknown = JSON.parse(code);

  if (!data) {
    return null;
  }

  if (data && Array.isArray((data as LegacyRules).share)) {
    return transformLegacyDataToRules(data, {
      search: true,
      share: true,
      imageSearch: true,
    });
  }

  return normalizeRules(data);
}

export default function CodeEdit({ rules, onSubmit, onClose }: CodeEditProps) {
  const [value, setValue] = useState(() => JSON.stringify(rules, null, 2));

  const [parsedRules, parseError] = useMemo(() => {
    try {
      return [parseCodeAsRules(value)];
    } catch (err) {
      return [null, err];
    }
  }, [value]);

  const handleSubmit = () => {
    if (parsedRules) {
      onSubmit(parsedRules);
      onClose();
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Code</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="code"
          fullWidth
          multiline
          variant="standard"
          value={value}
          rows={10}
          className="code-edit-input"
          error={Boolean(parseError)}
          onChange={(e) => setValue(e.target.value)}
          helperText={parseError ? `格式错误：${String(parseError)}` : null}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit}>确认</Button>
      </DialogActions>
    </Dialog>
  );
}
