import Icon from './Icon'
export const Button = ({ ghost, className = '', ...p }) => <button className={`btn ${ghost ? 'ghost' : ''} ${className}`} {...p} />
export const IconButton = ({ icon, size, fill, active, className = '', ...p }) => <button className={`ib ${active ? 'on' : ''} ${className}`} {...p}><Icon name={icon} size={size} fill={fill} /></button>
