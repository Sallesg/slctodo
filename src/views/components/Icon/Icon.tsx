import { EyeOffIcon } from '@assets/icons/EyeOffIcon';
import { ArrowRight } from '@assets/icons/ArrowRight';
import { Pressable } from './style';
import { CheckRound } from '@assets/icons/CheckRound';
import { CancelRound } from '@assets/icons/CancelRound';
import { NewTask } from '@assets/icons/Newtask';
import { TrashIcon } from '@assets/icons/Trash';
import { EditIcon } from '@assets/icons/Edit';
import { DescriptionIcon } from '@assets/icons/Description';
import { AttachmentIcon } from '@assets/icons/Attachment';
// import { ThemeColors } from '@views/styles/theme';

export interface IconBase {
  size?: number;
  color?: string;
}

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  onClick?: () => void;
}

export function Icon({ name, color, size, onClick }: IconProps) {
  const SVGIcon = iconRegistry[name];

  if (onClick) {
    return (
      <Pressable onClick={onClick} color={color}>
        <SVGIcon size={size} />
      </Pressable>
    );
  }

  return <SVGIcon size={size} />;
}

const iconRegistry = {
  eyeOff: EyeOffIcon,
  arrowRight: ArrowRight,
  checkRound: CheckRound,
  cancelRound: CancelRound,
  newTask: NewTask,
  trashIcon: TrashIcon,
  editIcon: EditIcon,
  descriptionIcon: DescriptionIcon,
  attachmentIcon: AttachmentIcon,
};

type IconType = typeof iconRegistry;

type IconName = keyof IconType;
