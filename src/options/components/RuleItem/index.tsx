import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Switch, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { MenuRule } from '../../../types';
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
    if (await confirm('确认删除？', `“${rule.name}”将被删除，删除后无法撤销`)) {
      onRuleDelete(rule);
    }
  };

  return (
    <li className="rule-item" ref={setNodeRef} style={style} {...attributes}>
      <DragIndicatorIcon
        fontSize="small"
        {...listeners}
        className="rule-item-drag"
      />

      <TextField
        size="small"
        label="name"
        variant="standard"
        value={rule.name}
        onChange={(e) => update({ name: e.target.value })}
      />

      <TextField
        size="small"
        label="url"
        variant="standard"
        value={rule.url}
        style={{
          flexGrow: 1,
        }}
        onChange={(e) => update({ url: e.target.value })}
      />

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
