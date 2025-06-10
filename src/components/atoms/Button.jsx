import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className = '', isAnimated = true, type = 'button', ...rest }) => {
    const Component = isAnimated ? motion.button : 'button';
    const motionProps = isAnimated ? { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } } : {};

    // Filter out non-HTML props if not using motion
    const filteredProps = {};
    for (const key in rest) {
        if (typeof rest[key] !== 'function' && key !== 'name' && key !== 'size') { // Basic filter for common React props
            filteredProps[key] = rest[key];
        }
    }

    return (
        <Component
            onClick={onClick}
            className={className}
            type={type}
            {...(isAnimated ? motionProps : filteredProps)}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Button;