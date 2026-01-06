import type { IconName } from '../../type';
import { Icon } from '../icon';
import './btn.css';

interface ButtonInterface {
    text: string;
    action(): void;
    icon: IconName;
    color: string;
    isActive: boolean;
    disable?: boolean;
}

const ThemeIconBtn: React.FC<ButtonInterface> = ({
    text,
    action,
    icon,
    color,
    isActive = false,
    disable = false,
}) => {
    return (
        <button
            onClick={action}
            className={`btn btn-theme btn-icon ${isActive ? "is-active " : ""}`}
            title={text}
            style={{ "--theme": color } as React.CSSProperties}
            disabled={disable}
        >

            <Icon name={icon} strokeWidth={2.2} className={` ${isActive ? "jump-settle" : ""}`} />

            <span className='btn_text'>{text}</span>
        </button>
    );
};

export default ThemeIconBtn;
