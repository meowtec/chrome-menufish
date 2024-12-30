import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  DEFAULT_WHITESPACE_ENCODE,
  MenuRule,
  WhitespaceEncode,
} from '../../../types';
import { confirm } from '../../../utils/confirm';
import './index.scss';

interface RuleItemProps {
  rule: MenuRule;
  onRuleChange(rule: MenuRule): void;
  onRuleDelete(rule: MenuRule): void;
}

function RuleItem({ rule, onRuleChange, onRuleDelete }: RuleItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: rule.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const update = (partial: Partial<MenuRule>) => {
    onRuleChange({
      ...rule,
      ...partial,
    });
  };

  const handleDelete = async () => {
    if (
      await confirm(
        chrome.i18n.getMessage('confirm_delete_title'),
        chrome.i18n.getMessage('confirm_delete_content', rule.name),
      )
    ) {
      onRuleDelete(rule);
    }
  };

  const spaceEncodingId = `space-encode-${rule.key}`;

  return (
    <li className="rule-item" ref={setNodeRef} style={style} {...attributes}>
      <DragIndicatorIcon
        fontSize="small"
        {...listeners}
        className="rule-item-drag"
      />

      <TextField
        size="small"
        label={chrome.i18n.getMessage('title')}
        variant="standard"
        value={rule.name}
        onChange={(e) => update({ name: e.target.value })}
      />

      <TextField
        size="small"
        label="URL"
        variant="standard"
        value={rule.url}
        style={{
          flexGrow: 1,
        }}
        onChange={(e) => update({ url: e.target.value })}
      />

      <FormControl style={{ minWidth: 80 }}>
        <InputLabel htmlFor={spaceEncodingId} variant="standard">
          {chrome.i18n.getMessage('whitespace_encoding')}
        </InputLabel>
        <Select
          labelId={spaceEncodingId}
          size="small"
          variant="standard"
          value={rule.whitespaceEncode ?? DEFAULT_WHITESPACE_ENCODE}
          onChange={(e) => {
            update({ whitespaceEncode: e.target.value as WhitespaceEncode });
          }}
        >
          <MenuItem value={WhitespaceEncode.plus}>
            a{WhitespaceEncode.plus}b
          </MenuItem>
          <MenuItem value={WhitespaceEncode.percent}>
            a{WhitespaceEncode.percent}b
          </MenuItem>
        </Select>
      </FormControl>
      <Switch
        size="small"
        checked={rule.enabled}
        onChange={(e, checked) => update({ enabled: checked })}
      />

      <IconButton
        size="small"
        aria-label="delete"
        className="rule-item-hover-visible"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}

export default memo(RuleItem);
