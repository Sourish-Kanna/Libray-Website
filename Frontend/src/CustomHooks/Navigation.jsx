import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToHash = (sections) => {
const refs = sections.reduce((acc, section) => {
    acc[section] = useRef(null);
    return acc;
}, {});

const location = useLocation();

useEffect(() => {
    const hash = location.hash;
    if (hash && refs[hash.replace('#', '')]?.current) {
    refs[hash.replace('#', '')].current.scrollIntoView({ behavior: 'smooth' });
    }
}, [location, refs]);

return refs;
};

export default useScrollToHash;