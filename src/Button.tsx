import React,{useEffect,useState} from 'react'

interface ButtonProps{
    onClick?: (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, children } = props;
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    
    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
          setIsRippling(true);
          setTimeout(() => setIsRippling(false), 300);
        } else setIsRippling(false);
      }, [coords]);
    
      useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
      }, [isRippling]);
    return (
        <button
        className="ripple-button"
            onClick={e => {
         const node = e.target as HTMLElement;
          const rect = node.getBoundingClientRect();
          setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          onClick && onClick(e);
        }}
      >
        {isRippling && (
          <span
            className="ripple"
            style={{
              left: coords.x,
              top: coords.y
            }}
          />
        )}
        <span className="content">{children}</span>
      </button>
    )
}

export default Button;