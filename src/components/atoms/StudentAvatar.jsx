import React from 'react';

const StudentAvatar = ({ name, className = '' }) => {
    const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '';
    return (
        &lt;div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center ${className}`}&gt;
            &lt;span className="text-white font-medium text-sm"&gt;
                {initials}
            &lt;/span&gt;
        &lt;/div&gt;
    );
};

export default StudentAvatar;